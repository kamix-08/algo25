from flask import render_template, redirect, request, url_for, flash
from flask_login import login_required
from extensions import db
from models import Inventory
from . import store_bp
import pandas as pd

@store_bp.route('/', methods=['GET', 'POST'])
@login_required
def index():
    page = request.args.get('page', 1, int)
    search = request.args.get('search', '').strip()
    query = Inventory.query
    
    if search:
        query = query.filter(
            Inventory.name.ilike(f'%{search}')     |
            Inventory.symbol.ilike(f"%{search}")   |
            Inventory.brand.ilike(f"%{search}")    |
            Inventory.model.ilike(f"%{search}")    |
            Inventory.category.ilike(f"%{search}")
        )
        
    pagination = query.order_by(Inventory.id).paginate(page=page, per_page=20)
    records = pagination.items
    return render_template('store/index.html', title='Magazyn', records=records, pagination=pagination, search=search)

@store_bp.route('/import', methods=['GET', 'POST']) # type: ignore
@login_required
def import_data():
    file = request.files.get('file')
    
    if not file:
        flash('Nie wybrano pliku', 'error')
        return redirect(url_for('store.index'))
    
    try:
        df = pd.read_csv(file) # type: ignore
    except Exception as e:
        flash(f"Błąd wczytywania pliku: {e}", 'danger')
        return redirect(url_for('store.index'))
    
    db.session.query(Inventory).delete()
    
    for _, row in df.iterrows():
        item = Inventory(
            id                  = int(row['id']),                   # type: ignore
            symbol              = row['symbol'],                      # type: ignore
            name                = row['name'],                        # type: ignore
            category            = row['category'],                    # type: ignore
            brand               = row['brand'],                       # type: ignore
            model               = row['model'],                       # type: ignore
            quantity            = int(row['quantity']),             # type: ignore
            weight_kg           = float(row['weight_kg']),          # type: ignore
            price_pln           = float(row['price_pln']),          # type: ignore
            inventory_value_pln = float(row['inventory_value_pln']) # type: ignore
        )
        
        db.session.add(item)
        
    db.session.commit()
    flash('Dane zostały zapisane poprawnie', 'success')
    return redirect(url_for('store.index'))