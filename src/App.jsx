import { useMemo, useState } from 'react'
import { ArrowRight, ChevronDown, Heart, Minus, Plus, Search, ShoppingBag, Sparkles, X } from 'lucide-react'
import './App.css'

const products = [
  { id: 1, name: 'Cloud lounge chair', category: 'Furniture', price: 489, image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=900&q=85', tag: 'Bestseller' },
  { id: 2, name: 'Arc ceramic vase', category: 'Decor', price: 68, image: 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=900&q=85', tag: 'New in' },
  { id: 3, name: 'Linen throw blanket', category: 'Textiles', price: 94, image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2a2?auto=format&fit=crop&w=900&q=85', tag: '' },
  { id: 4, name: 'Mori table lamp', category: 'Lighting', price: 156, image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=85', tag: 'Staff pick' },
  { id: 5, name: 'Everyday stoneware set', category: 'Kitchen', price: 128, image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=900&q=85', tag: '' },
  { id: 6, name: 'Ripple glass carafe', category: 'Kitchen', price: 52, image: 'https://images.unsplash.com/photo-1615887023516-9b6bcd77c8c5?auto=format&fit=crop&w=900&q=85', tag: 'New in' },
]
const categories = ['All pieces', 'Furniture', 'Decor', 'Textiles', 'Lighting', 'Kitchen']

function App() {
  const [activeCategory, setActiveCategory] = useState('All pieces')
  const [search, setSearch] = useState('')
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [favorites, setFavorites] = useState([])
  const filteredProducts = useMemo(() => products.filter((product) => (activeCategory === 'All pieces' || product.category === activeCategory) && product.name.toLowerCase().includes(search.toLowerCase())), [activeCategory, search])
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0)
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
  function addToCart(product) {
    setCart((current) => { const existing = current.find((item) => item.id === product.id); return existing ? current.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item) : [...current, { ...product, quantity: 1 }] })
    setCartOpen(true)
  }
  function changeQuantity(id, amount) {
    setCart((current) => current.flatMap((item) => { if (item.id !== id) return [item]; const quantity = item.quantity + amount; return quantity > 0 ? [{ ...item, quantity }] : [] }))
  }
  return (
    <div className="app-shell">
      <div className="announcement"><Sparkles size={14} /> Complimentary delivery on orders over $150 <ArrowRight size={14} /></div>
      <header className="site-header"><a className="logo" href="#top" aria-label="Morrow home">morrow<span>®</span></a><nav className="main-nav" aria-label="Main navigation"><a href="#shop">Shop</a><a href="#story">Our story</a><a href="#journal">Journal</a></nav><div className="header-actions"><label className="search-box"><Search size={17} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search pieces" aria-label="Search pieces" /></label><button className="icon-button" type="button" aria-label="View favorites"><Heart size={20} fill={favorites.length ? 'currentColor' : 'none'} /></button><button className="bag-button" type="button" onClick={() => setCartOpen(true)} aria-label={`Shopping bag, ${cartCount} items`}><ShoppingBag size={20} /><span>{cartCount}</span></button></div></header>
      <main id="top">
        <section className="hero-section"><div className="hero-copy"><p className="eyebrow">The autumn edit / 2026</p><h1>Good things,<br /><em>well made.</em></h1><p className="hero-text">Thoughtful objects for slower mornings, longer dinners, and all the little rituals in between.</p><a className="text-link" href="#shop">Explore the collection <ArrowRight size={17} /></a></div><div className="hero-art"><img src="https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1600&q=90" alt="Warm, sunlit living room with a lounge chair" /><div className="hero-note">01 / <span>quiet luxury</span></div></div></section>
        <section className="shop-section" id="shop"><div className="section-heading"><div><p className="eyebrow">Curated for living</p><h2>Objects with a point of view</h2></div><p className="result-count">{filteredProducts.length} pieces</p></div><div className="category-row">{categories.map((category) => <button type="button" key={category} className={activeCategory === category ? 'category active' : 'category'} onClick={() => setActiveCategory(category)}>{category}</button>)}<button className="sort-button" type="button">Sort by <ChevronDown size={15} /></button></div><div className="product-grid">{filteredProducts.map((product) => <article className="product-card" key={product.id}><div className="product-image"><img src={product.image} alt={product.name} />{product.tag && <span className="product-tag">{product.tag}</span>}<button type="button" className="favorite-button" aria-label={`Add ${product.name} to favorites`} onClick={() => setFavorites((current) => current.includes(product.id) ? current.filter((id) => id !== product.id) : [...current, product.id])}><Heart size={18} fill={favorites.includes(product.id) ? 'currentColor' : 'none'} /></button><button type="button" className="quick-add" onClick={() => addToCart(product)}>Add to bag <Plus size={15} /></button></div><div className="product-info"><div><h3>{product.name}</h3><p>{product.category}</p></div><strong>${product.price}</strong></div></article>)}</div></section>
        <section className="story-section" id="story"><div className="story-image"><img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=85" alt="Minimal dining space with natural textures" /></div><div className="story-copy"><p className="eyebrow">Why morrow</p><h2>Less, but better.</h2><p>We believe the things around us should earn their place. Morrow brings together pieces with honest materials, considered forms, and a long life ahead.</p><a className="text-link" href="#journal">Read our story <ArrowRight size={17} /></a></div></section>
      </main>
      <footer><div className="logo">morrow<span>®</span></div><p>Objects for the everyday.</p><div className="footer-links"><a href="#shop">Instagram</a><a href="#shop">Shipping & returns</a><a href="#shop">Contact</a></div></footer>
      {cartOpen && <div className="drawer-overlay" onClick={() => setCartOpen(false)}><aside className="cart-drawer" onClick={(event) => event.stopPropagation()}><div className="drawer-header"><div><p className="eyebrow">Your selection</p><h2>Shopping bag <span>({cartCount})</span></h2></div><button className="icon-button" type="button" onClick={() => setCartOpen(false)} aria-label="Close shopping bag"><X size={22} /></button></div>{cart.length === 0 ? <div className="empty-cart"><ShoppingBag size={30} /><p>Your bag is waiting for something good.</p><button type="button" className="solid-button" onClick={() => setCartOpen(false)}>Continue shopping</button></div> : <><div className="cart-items">{cart.map((item) => <div className="cart-item" key={item.id}><img src={item.image} alt="" /><div className="cart-item-info"><h3>{item.name}</h3><p>${item.price}</p><div className="quantity"><button type="button" onClick={() => changeQuantity(item.id, -1)} aria-label="Decrease quantity"><Minus size={13} /></button><span>{item.quantity}</span><button type="button" onClick={() => changeQuantity(item.id, 1)} aria-label="Increase quantity"><Plus size={13} /></button></div></div></div>)}</div><div className="cart-summary"><div><span>Subtotal</span><strong>${cartTotal}</strong></div><p>Taxes and shipping calculated at checkout.</p><button type="button" className="solid-button">Checkout <ArrowRight size={16} /></button></div></>}</aside></div>}
    </div>
  )
}
export default App
