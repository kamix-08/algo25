from . import shop_bp
from flask import render_template, redirect, url_for, flash
from flask_login import login_required, current_user
from extensions import db
from models import CartItem, Inventory

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