
import './PerfumeCardcss.css';
import { router } from '@inertiajs/react';

export default function PerfumeCard({ perfume }) {
    return (
        <div className="perfume-card">
            <div className="card-content">
                <div className="image-container">
                    <img className="image" alt="Mask group" src={`/storage/${perfume.imageUrl}`} />
                </div>
                <div className="name">{perfume.name}</div>
                <div className="price">${perfume.price}</div>
                <div className="description">{perfume.description}</div>
                <div className="label">{perfume.category}</div>
                {perfume.stock > 0 ? (<button 
                    className="add-to-cart-btn"
                    onClick={() => router.post(route('cart.add', perfume.id))}
                >
                    Add to Cart
                </button>):
                (
    <button 
        disabled
        className="mt-4 w-full bg-gray-200 text-gray-500 py-2 rounded-full text-sm cursor-not-allowed"
    >
        Out of Stock
    </button>
)
                }
                
            </div>
        </div>
    );
}