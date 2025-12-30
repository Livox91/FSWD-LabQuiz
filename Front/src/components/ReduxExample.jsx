import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, reset, addProduct, removeProduct } from '../actions';

const ReduxExample = () => {
    const count = useSelector(state => state.counter.count);
    const products = useSelector(state => state.products.products);
    const dispatch = useDispatch();

    const handleAddProduct = () => {
        const newProduct = {
            id: Date.now(),
            name: `Product ${products.length + 1}`,
            price: Math.floor(Math.random() * 100) + 1
        };
        dispatch(addProduct(newProduct));
    };

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
            <h2>Redux Example</h2>

            {/* Counter Section */}
            <div style={{ marginBottom: '30px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
                <h3>Counter: {count}</h3>
                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                    <button onClick={() => dispatch(increment())} style={buttonStyle}>
                        Increment
                    </button>
                    <button onClick={() => dispatch(decrement())} style={buttonStyle}>
                        Decrement
                    </button>
                    <button onClick={() => dispatch(reset())} style={{ ...buttonStyle, backgroundColor: '#ff6b6b' }}>
                        Reset
                    </button>
                </div>
            </div>

            {/* Products Section */}
            <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
                <h3>Products ({products.length})</h3>
                <button onClick={handleAddProduct} style={{ ...buttonStyle, backgroundColor: '#51cf66', marginBottom: '15px' }}>
                    Add Random Product
                </button>

                <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                    {products.length === 0 ? (
                        <p style={{ color: '#666', fontStyle: 'italic' }}>No products added yet</p>
                    ) : (
                        products.map(product => (
                            <div key={product.id} style={productStyle}>
                                <span>{product.name} - ${product.price}</span>
                                <button
                                    onClick={() => dispatch(removeProduct(product.id))}
                                    style={{ ...buttonStyle, backgroundColor: '#ff8787', fontSize: '12px', padding: '5px 10px' }}
                                >
                                    Remove
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

const buttonStyle = {
    padding: '8px 16px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#4dabf7',
    color: 'white',
    cursor: 'pointer',
    fontSize: '14px'
};

const productStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px',
    margin: '5px 0',
    backgroundColor: '#f8f9fa',
    borderRadius: '4px'
};

export default ReduxExample;