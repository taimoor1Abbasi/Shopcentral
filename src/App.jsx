import { useMemo, useState } from 'react'
import { ArrowRight, ChevronDown, Heart, Minus, Plus, Search, ShoppingBag, Sparkles, UserRoundPlus, UsersRound, X } from 'lucide-react'
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
const initialUsers = [
  { id: 1, name: 'Amelia Hart', email: 'amelia.hart@email.com', status: 'Active', orders: 8, spent: 1248, joined: 'Sep 18, 2026' },
  { id: 2, name: 'Theo Bennett', email: 'theo.bennett@email.com', status: 'Active', orders: 5, spent: 862, joined: 'Sep 16, 2026' },
  { id: 3, name: 'Maya Chen', email: 'maya.chen@email.com', status: 'Invited', orders: 0, spent: 0, joined: 'Sep 14, 2026' },
  { id: 4, name: 'Oliver James', email: 'oliver.james@email.com', status: 'Active', orders: 12, spent: 2316, joined: 'Sep 12, 2026' },
  { id: 5, name: 'Sofia Laurent', email: 'sofia.laurent@email.com', status: 'Paused', orders: 2, spent: 346, joined: 'Sep 10, 2026' },
  { id: 6, name: 'Noah Williams', email: 'noah.williams@email.com', status: 'Active', orders: 3, spent: 514, joined: 'Sep 08, 2026' },
]

function App() {
  const [activePage, setActivePage] = useState('shop')
  const [activeCategory, setActiveCategory] = useState('All pieces')
  const [search, setSearch] = useState('')
  const [userSearch, setUserSearch] = useState('')
  const [userFilter, setUserFilter] = useState('All users')
  const [users, setUsers] = useState(initialUsers)
  const [inviteOpen, setInviteOpen] = useState(false)
  const [inviteName, setInviteName] = useState('')
  const [inviteEmail, setInviteEmail] = useState('')
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [favorites, setFavorites] = useState([])
  const filteredProducts = useMemo(() => products.filter((product) => (activeCategory === 'All pieces' || product.category === activeCategory) && product.name.toLowerCase().includes(search.toLowerCase())), [activeCategory, search])
  const filteredUsers = useMemo(() => users.filter((user) => (userFilter === 'All users' || user.status === userFilter) && `${user.name} ${user.email}`.toLowerCase().includes(userSearch.toLowerCase())), [userFilter, userSearch, users])
  const activeUsers = users.filter((user) => user.status === 'Active').length
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0)
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
  function addToCart(product) {
    setCart((current) => { const existing = current.find((item) => item.id === product.id); return existing ? current.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item) : [...current, { ...product, quantity: 1 }] })
    setCartOpen(true)
  }
  function changeQuantity(id, amount) {
    setCart((current) => current.flatMap((item) => { if (item.id !== id) return [item]; const quantity = item.quantity + amount; return quantity > 0 ? [{ ...item, quantity }] : [] }))
  }
  function inviteUser(event) {
    event.preventDefault()
    setUsers((current) => [{ id: Date.now(), name: inviteName.trim(), email: inviteEmail.trim(), status: 'Invited', orders: 0, spent: 0, joined: new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).format(new Date()) }, ...current])
    setInviteName('')
    setInviteEmail('')
    setInviteOpen(false)
  }
  return (
    <div className="app-shell">
      <div className="announcement"><Sparkles size={14} /> Complimentary delivery on orders over $150 <ArrowRight size={14} /></div>
      <header className="site-header"><a className="logo" href="#top" onClick={() => setActivePage('shop')} aria-label="Morrow home">morrow<span>®</span></a><nav className="main-nav" aria-label="Main navigation"><a href="#shop" className={activePage === 'shop' ? 'nav-active' : ''} onClick={() => setActivePage('shop')}>Shop</a><a href="#story" onClick={() => setActivePage('shop')}>Our story</a><a href="#journal" onClick={() => setActivePage('shop')}>Journal</a><a href="#users" className={activePage === 'users' ? 'nav-active' : ''} onClick={() => setActivePage('users')}>Users</a></nav><div className="header-actions"><label className="search-box"><Search size={17} /><input value={activePage === 'users' ? userSearch : search} onChange={(event) => activePage === 'users' ? setUserSearch(event.target.value) : setSearch(event.target.value)} placeholder={activePage === 'users' ? 'Search users' : 'Search pieces'} aria-label={activePage === 'users' ? 'Search users' : 'Search pieces'} /></label><button className="icon-button" type="button" aria-label="View favorites"><Heart size={20} fill={favorites.length ? 'currentColor' : 'none'} /></button><button className="bag-button" type="button" onClick={() => setCartOpen(true)} aria-label={`Shopping bag, ${cartCount} items`}><ShoppingBag size={20} /><span>{cartCount}</span></button></div></header>
      <main id="top">
        {activePage === 'users' ? <section className="users-page" id="users">
          <div className="users-heading"><div><p className="eyebrow">Customer relationships</p><h1>People, <em>first.</em></h1><p className="users-intro">A considered view of everyone who shops with Morrow.</p></div><button className="invite-button" type="button" onClick={() => setInviteOpen(true)}><UserRoundPlus size={16} /> Invite user</button></div>
          <div className="user-stats"><div><span>Total users</span><strong>{users.length}</strong><small>Across your customer list</small></div><div><span>Active customers</span><strong>{activeUsers}</strong><small>{users.length ? Math.round(activeUsers / users.length * 100) : 0}% of all users</small></div><div><span>Invitations pending</span><strong>{users.filter((user) => user.status === 'Invited').length}</strong><small>Waiting to join</small></div></div>
          <div className="user-list-heading"><div><h2>Customer directory</h2><p>{filteredUsers.length} {filteredUsers.length === 1 ? 'person' : 'people'}</p></div><div className="user-filters">{['All users', 'Active', 'Invited', 'Paused'].map((filter) => <button type="button" key={filter} className={userFilter === filter ? 'user-filter active' : 'user-filter'} onClick={() => setUserFilter(filter)}>{filter}</button>)}</div></div>
          <div className="user-table-wrap"><table className="user-table"><thead><tr><th>Customer</th><th>Status</th><th>Orders</th><th>Total spent</th><th>Joined</th></tr></thead><tbody>{filteredUsers.map((user) => <tr key={user.id}><td><div className="user-identity"><span className="user-avatar">{user.name.split(' ').map((part) => part[0]).join('')}</span><span><strong>{user.name}</strong><small>{user.email}</small></span></div></td><td><span className={`user-status status-${user.status.toLowerCase()}`}><i />{user.status}</span></td><td>{user.orders}</td><td>${user.spent.toLocaleString()}</td><td>{user.joined}</td></tr>)}</tbody></table>{filteredUsers.length === 0 && <div className="users-empty"><UsersRound size={25} /><p>No users match this search.</p></div>}</div>
        </section> : <>
        <section className="hero-section"><div className="hero-copy"><p className="eyebrow">The autumn edit / 2026</p><h1>Good things,<br /><em>well made.</em></h1><p className="hero-text">Thoughtful objects for slower mornings, longer dinners, and all the little rituals in between.</p><a className="text-link" href="#shop">Explore the collection <ArrowRight size={17} /></a></div><div className="hero-art"><img src="https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1600&q=90" alt="Warm, sunlit living room with a lounge chair" /><div className="hero-note">01 / <span>quiet luxury</span></div></div></section>
        <section className="shop-section" id="shop"><div className="section-heading"><div><p className="eyebrow">Curated for living</p><h2>Objects with a point of view</h2></div><p className="result-count">{filteredProducts.length} pieces</p></div><div className="category-row">{categories.map((category) => <button type="button" key={category} className={activeCategory === category ? 'category active' : 'category'} onClick={() => setActiveCategory(category)}>{category}</button>)}<button className="sort-button" type="button">Sort by <ChevronDown size={15} /></button></div><div className="product-grid">{filteredProducts.map((product) => <article className="product-card" key={product.id}><div className="product-image"><img src={product.image} alt={product.name} />{product.tag && <span className="product-tag">{product.tag}</span>}<button type="button" className="favorite-button" aria-label={`Add ${product.name} to favorites`} onClick={() => setFavorites((current) => current.includes(product.id) ? current.filter((id) => id !== product.id) : [...current, product.id])}><Heart size={18} fill={favorites.includes(product.id) ? 'currentColor' : 'none'} /></button><button type="button" className="quick-add" onClick={() => addToCart(product)}>Add to bag <Plus size={15} /></button></div><div className="product-info"><div><h3>{product.name}</h3><p>{product.category}</p></div><strong>${product.price}</strong></div></article>)}</div></section>
        <section className="story-section" id="story"><div className="story-image"><img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=85" alt="Minimal dining space with natural textures" /></div><div className="story-copy"><p className="eyebrow">Why morrow</p><h2>Less, but better.</h2><p>We believe the things around us should earn their place. Morrow brings together pieces with honest materials, considered forms, and a long life ahead.</p><a className="text-link" href="#journal">Read our story <ArrowRight size={17} /></a></div></section>
        </>}
      </main>
      <footer><div className="logo">morrow<span>®</span></div><p>Objects for the everyday.</p><div className="footer-links"><a href="#shop">Instagram</a><a href="#shop">Shipping & returns</a><a href="#shop">Contact</a></div></footer>
      {cartOpen && <div className="drawer-overlay" onClick={() => setCartOpen(false)}><aside className="cart-drawer" onClick={(event) => event.stopPropagation()}><div className="drawer-header"><div><p className="eyebrow">Your selection</p><h2>Shopping bag <span>({cartCount})</span></h2></div><button className="icon-button" type="button" onClick={() => setCartOpen(false)} aria-label="Close shopping bag"><X size={22} /></button></div>{cart.length === 0 ? <div className="empty-cart"><ShoppingBag size={30} /><p>Your bag is waiting for something good.</p><button type="button" className="solid-button" onClick={() => setCartOpen(false)}>Continue shopping</button></div> : <><div className="cart-items">{cart.map((item) => <div className="cart-item" key={item.id}><img src={item.image} alt="" /><div className="cart-item-info"><h3>{item.name}</h3><p>${item.price}</p><div className="quantity"><button type="button" onClick={() => changeQuantity(item.id, -1)} aria-label="Decrease quantity"><Minus size={13} /></button><span>{item.quantity}</span><button type="button" onClick={() => changeQuantity(item.id, 1)} aria-label="Increase quantity"><Plus size={13} /></button></div></div></div>)}</div><div className="cart-summary"><div><span>Subtotal</span><strong>${cartTotal}</strong></div><p>Taxes and shipping calculated at checkout.</p><button type="button" className="solid-button">Checkout <ArrowRight size={16} /></button></div></>}</aside></div>}
      {inviteOpen && <div className="invite-overlay" onClick={() => setInviteOpen(false)}><section className="invite-modal" onClick={(event) => event.stopPropagation()} aria-labelledby="invite-title"><div className="invite-modal-heading"><div><p className="eyebrow">Grow your community</p><h2 id="invite-title">Invite a user</h2></div><button className="icon-button" type="button" onClick={() => setInviteOpen(false)} aria-label="Close invite form"><X size={21} /></button></div><form onSubmit={inviteUser}><label>Name<input autoFocus required value={inviteName} onChange={(event) => setInviteName(event.target.value)} placeholder="Full name" /></label><label>Email address<input required type="email" value={inviteEmail} onChange={(event) => setInviteEmail(event.target.value)} placeholder="name@example.com" /></label><div className="invite-modal-actions"><button type="button" className="cancel-button" onClick={() => setInviteOpen(false)}>Cancel</button><button type="submit" className="invite-button">Send invitation <ArrowRight size={15} /></button></div></form></section></div>}
    </div>
  )
}
export default App
