from . import shop_bp
from flask import render_template, redirect, url_for, flash, request
from flask_login import login_required, current_user
from extensions import db
from models import CartItem, Inventory, Order, OrderItem

@shop_bp.route('/')
@login_required
def index():
    products = Inventory.query.all()
    return render_template('index.html', products=products, title='Shop')

@shop_bp.route('/add_to_cart/<int:product_id>', methods=['POST'])
@login_required
def add_to_cart(product_id):
    product = Inventory.query.get_or_404(product_id)
    
    if product.quantity <= 0:
        flash('Produkt jest niedostępny.', 'danger')
        return redirect(url_for('shop.index'))
    
    cart_item = CartItem.query.filter_by(user_id=current_user.id, product_id=product_id).first()
    
    if cart_item:
        cart_item.quantity += 1
    else:
        cart_item = CartItem(user_id=current_user.id, product_id=product_id, quantity=1) # type: ignore
        db.session.add(cart_item)
    
    db.session.commit()
    flash(f'Dodano {product.name} do koszyka.', 'success')
    return redirect(url_for('shop.cart'))

@shop_bp.route('/cart')
@login_required
def cart():
    cart_items = CartItem.query.filter_by(user_id=current_user.id).all()
    total = sum(item.product.price_pln * item.quantity for item in cart_items)
    return render_template('cart.html', cart_items=cart_items, total=total, title='Koszyk')

@shop_bp.route('/checkout')
@login_required
def checkout():
    cart_items = CartItem.query.filter_by(user_id=current_user.id).all()
    
    if not cart_items:
        flash('Twój koszyk jest pusty.', 'warning')
        return redirect(url_for('shop.cart'))
    
    total = 0
    order = Order(user_id=current_user.id, total_price=0) # type: ignore
    db.session.add(order)
    db.session.flush()
    
    for item in cart_items:
        if item.product.quantity < item.quantity:
            flash(f'Nie ma wystarczającej ilości {item.product.name} w magazynie.', 'danger')
            return redirect(url_for('shop.cart'))
        
        item.product.quantity -= item.quantity
        subtotal = item.product.price_pln * item.quantity
        total += subtotal
        
        order_item = OrderItem(order_id=order.id, product_id=item.product_id, quantity=item.quantity, price=item.product.price_pln) # type: ignore
        db.session.add(order_item)
        
    order.total_price = total
    
    for item in cart_items:
        db.session.delete(item)
        
    db.session.commit()
    flash('Zamówienie zostało złożone pomyślnie!', 'success')
    return redirect(url_for('shop.index'))

@shop_bp.route('/orders')
@login_required
def orders():
    orders = (
        Order.query.filter_by(user_id=current_user.id)
        .order_by(Order.created_at.desc())
        .all()
    )
    
    order_ids = [order.id for order in orders]
    items = []
    for order_id in order_ids:
        items = (
            OrderItem.query.filter(OrderItem.order_id.in_(order_ids))
            .order_by(OrderItem.order_id.desc(), OrderItem.id.asc())
            .all()
        )
        
    product_ids = [item.product_id for item in items]
    products = []
    if product_ids:
        products = Inventory.query.filter(Inventory.id.in_(product_ids)).all()
        
    products_by_id = {p.id: p for p in products}
    items_by_order_id = {}
    for i in items:
        items_by_order_id.setdefault(i.order_id, []).append(i)
    
    return render_template('orders.html', orders=orders, items_by_order_id=items_by_order_id, products_by_id=products_by_id, title='Moje Zamówienia')

@shop_bp.route('/remove_from_cart/<int:item_id>')
@login_required
def remove_from_cart(item_id):
    cart_item = CartItem.query.get_or_404(item_id)
    
    if cart_item.user_id != current_user.id:
        flash('Nie masz uprawnień do usunięcia tego przedmiotu.', 'danger')
        return redirect(url_for('shop.cart'))
    
    product_name = cart_item.product.name
    db.session.delete(cart_item)
    db.session.commit()
    flash(f'Usunięto {product_name} z koszyka.', 'success')
    return redirect(url_for('shop.cart'))

@shop_bp.route('/update_cart/<int:item_id>', methods=['POST'])
@login_required
def update_cart(item_id):
    cart_item = CartItem.query.get_or_404(item_id)
    
    if cart_item.user_id != current_user.id:
        flash('Nie masz uprawnień do aktualizacji tego przedmiotu.', 'danger')
        return redirect(url_for('shop.cart'))
    
    try:
        quantity = int(request.form.get('quantity', 1))
        if quantity < 1:
            raise ValueError
    except ValueError:
        flash('Nieprawidłowa ilość.', 'danger')
        return redirect(url_for('shop.cart'))
    
    if cart_item.product.quantity < quantity:
        flash(f'Nie ma wystarczającej ilości {cart_item.product.name} w magazynie.', 'danger')
        return redirect(url_for('shop.cart'))
    
    cart_item.quantity = quantity
    db.session.commit()
    flash(f'Aktualizowano ilość {cart_item.product.name} w koszyku.', 'success')
    return redirect(url_for('shop.cart'))