import { BrowserRouter, NavLink, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import './App.css'

type AuthMode = 'login' | 'register'

const posts = [
  {
    id: 1,
    title: 'Simple and useful HTML layout',
    category: 'Travel . Events',
    date: 'June 24, 2020',
    comments: '36 comments',
    author: 'Admin Nat',
    image: '/img/img-01.jpg',
    excerpt:
      'There is a clickable image with beautiful hover effect and active title link for each post item. Left side is a sticky menu bar. Right side is a blog content that will scroll up and down.',
  },
  {
    id: 2,
    title: 'Multi-purpose blog template',
    category: 'Creative . Design . Business',
    date: 'June 16, 2020',
    comments: '48 comments',
    author: 'Admin Sam',
    image: '/img/img-02.jpg',
    excerpt:
      'Xtra Blog is a multi-purpose HTML CSS template from TemplateMo website. Blog list, single post, about, contact pages are included.',
  },
  {
    id: 3,
    title: 'How can you apply Xtra Blog',
    category: 'Music . Audio',
    date: 'June 11, 2020',
    comments: '24 comments',
    author: 'John Walker',
    image: '/img/img-03.jpg',
    excerpt:
      'You are allowed to convert this template as any kind of CMS theme or template for your custom website builder. You can also use this for your clients.',
  },
  {
    id: 4,
    title: 'A little restriction to apply',
    category: 'Artworks . Design',
    date: 'June 4, 2020',
    comments: '72 comments',
    author: 'Admin Sam',
    image: '/img/img-04.jpg',
    excerpt:
      'You are not allowed to re-distribute this template as a downloadable ZIP file on any template collection website. This is strongly prohibited.',
  },
  {
    id: 5,
    title: 'Color hexa values of Xtra Blog',
    category: 'Creative . Video . Audio',
    date: 'May 31, 2020',
    comments: '84 comments',
    author: 'Admin Sam',
    image: '/img/img-05.jpg',
    excerpt:
      'If you wish to kindly support us, please contact us or contribute a small PayPal amount. Title #099 New #0CC.',
  },
  {
    id: 6,
    title: 'Donec convallis varius risus',
    category: 'Visual . Artworks',
    date: 'June 16, 2020',
    comments: '96 comments',
    author: 'Admin Sam',
    image: '/img/img-06.jpg',
    excerpt:
      'Quisque id ipsum vel sem maximus vulputate sed quis velit. Nunc vel turpis eget orci elementum cursus vitae in eros.',
  },
]

const fullNavItems = [
  { label: 'Blog Home', path: '/', icon: 'fas fa-home' },
  { label: 'Single Post', path: '/post', icon: 'fas fa-pen' },
  { label: 'About Xtra', path: '/about', icon: 'fas fa-users' },
  { label: 'Contact Us', path: '/contact', icon: 'far fa-comments' },
]

const authNavItems = [
  { label: 'Login', path: '/login', icon: 'fas fa-sign-in-alt' },
  { label: 'Register', path: '/register', icon: 'fas fa-user-plus' },
]

function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  )
}

function AppShell() {
  const location = useLocation()
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  const isAuthRoute = location.pathname === '/login' || location.pathname === '/register'
  const showSidebar = isLoggedIn || isAuthRoute

  if (!isLoggedIn && !isAuthRoute) {
    return <Navigate to="/login" replace />
  }

  if (isLoggedIn && isAuthRoute) {
    return <Navigate to="/" replace />
  }

  const navItems = isLoggedIn ? fullNavItems : authNavItems

  const handleLogin = () => {
    setIsLoggedIn(true)
    navigate('/')
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setIsSidebarCollapsed(false)
    navigate('/login')
  }

  return (
    <div className={`app-shell${showSidebar && isSidebarCollapsed ? ' sidebar-collapsed' : ''}`}>
      {showSidebar && (
        <header className="tm-header" id="tm-header">
          <div className="tm-header-wrapper">
            <button
              className="navbar-toggler sidebar-toggle"
              type="button"
              aria-label="Toggle sidebar"
              onClick={() => setIsSidebarCollapsed((value) => !value)}
            >
              <i className={`fas ${isSidebarCollapsed ? 'fa-chevron-right' : 'fa-chevron-left'}`} />
            </button>

            <div className="tm-site-header">
              <div className="mb-3 mx-auto tm-site-logo">
                <i className="fas fa-times fa-2x" />
              </div>
              <h1 className="text-center">Xtra Blog</h1>
            </div>

            <nav className="tm-nav" id="tm-nav">
              <ul>
                {navItems.map((item) => (
                  <li key={item.path} className="tm-nav-item">
                    <NavLink
                      end={item.path === '/'}
                      to={item.path}
                      className={({ isActive }) =>
                        `tm-nav-link${isActive ? ' active-link' : ''}`
                      }
                    >
                      <i className={item.icon} />
                      <span>{item.label}</span>
                    </NavLink>
                  </li>
                ))}

                {isLoggedIn && (
                  <li className="tm-nav-item">
                    <button type="button" className="tm-nav-link logout-link" onClick={handleLogout}>
                      <i className="fas fa-sign-out-alt" />
                      <span>Logout</span>
                    </button>
                  </li>
                )}
              </ul>
            </nav>

            <div className="tm-mb-65">
              <a rel="nofollow" href="https://fb.com/templatemo" className="tm-social-link">
                <i className="fab fa-facebook tm-social-icon" />
              </a>
              <a href="https://twitter.com" className="tm-social-link">
                <i className="fab fa-twitter tm-social-icon" />
              </a>
              <a href="https://instagram.com" className="tm-social-link">
                <i className="fab fa-instagram tm-social-icon" />
              </a>
              <a href="https://linkedin.com" className="tm-social-link">
                <i className="fab fa-linkedin tm-social-icon" />
              </a>
            </div>

            <p className="tm-mb-80 pr-5 text-white">
              Xtra Blog is a multi-purpose HTML template from TemplateMo website. Left side is a sticky menu bar. Right side content will scroll up and down.
            </p>
          </div>
        </header>
      )}

      <div className="container-fluid">
        <main className={`tm-main${!showSidebar ? ' auth-main' : ''}`}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/post" element={<PostPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<AuthPage mode="login" onLogin={handleLogin} />} />
            <Route path="/register" element={<AuthPage mode="register" onLogin={handleLogin} />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

function HomePage() {
  return (
    <>
      <div className="row tm-row">
        <div className="col-12">
          <form className="form-inline tm-mb-80 tm-search-form">
            <input
              className="form-control tm-search-input"
              name="query"
              type="text"
              placeholder="Search..."
              aria-label="Search"
            />
            <button className="tm-search-button" type="submit">
              <i className="fas fa-search tm-search-icon" aria-hidden="true" />
            </button>
          </form>
        </div>
      </div>

      <div className="row tm-row">
        {posts.map((post) => (
          <article key={post.id} className="col-12 col-md-6 tm-post">
            <hr className="tm-hr-primary" />
            <NavLink to="/post" className="effect-lily tm-post-link tm-pt-60">
              <div className="tm-post-link-inner">
                <img src={post.image} alt={post.title} className="img-fluid" />
              </div>
              <span className="position-absolute tm-new-badge">New</span>
              <h2 className="tm-pt-30 tm-color-primary tm-post-title">{post.title}</h2>
            </NavLink>
            <p className="tm-pt-30">{post.excerpt}</p>
            <div className="d-flex justify-content-between tm-pt-45">
              <span className="tm-color-primary">{post.category}</span>
              <span className="tm-color-primary">{post.date}</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between">
              <span>{post.comments}</span>
              <span>by {post.author}</span>
            </div>
          </article>
        ))}
      </div>

      <div className="row tm-row tm-mt-100 tm-mb-75">
        <div className="tm-prev-next-wrapper">
          <a href="#" className="mb-2 tm-btn tm-btn-primary tm-prev-next disabled tm-mr-20">
            Prev
          </a>
          <a href="#" className="mb-2 tm-btn tm-btn-primary tm-prev-next">
            Next
          </a>
        </div>
        <div className="tm-paging-wrapper">
          <span className="d-inline-block mr-3">Page</span>
          <nav className="tm-paging-nav d-inline-block">
            <ul>
              {['1', '2', '3', '4'].map((page, index) => (
                <li key={page} className={`tm-paging-item${index === 0 ? ' active' : ''}`}>
                  <a href="#" className="mb-2 tm-btn tm-paging-link">
                    {page}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <footer className="row tm-row">
        <hr className="col-12" />
        <div className="col-md-6 col-12 tm-color-gray">
          Design: <a rel="nofollow" target="_parent" href="https://templatemo.com" className="tm-external-link">TemplateMo</a>
        </div>
        <div className="col-md-6 col-12 tm-color-gray tm-copyright">
          Copyright 2020 Xtra Blog Company Co. Ltd.
        </div>
      </footer>
    </>
  )
}

function PostPage() {
  return (
    <>
      <div className="row tm-row">
        <div className="col-12">
          <form className="form-inline tm-mb-80 tm-search-form">
            <input className="form-control tm-search-input" name="query" type="text" placeholder="Search..." aria-label="Search" />
            <button className="tm-search-button" type="submit">
              <i className="fas fa-search tm-search-icon" aria-hidden="true" />
            </button>
          </form>
        </div>
      </div>

      <div className="row tm-row">
        <div className="col-12">
          <hr className="tm-hr-primary tm-mb-55" />
          <video width="954" height="535" controls className="tm-mb-40">
            <source src="/video/wheat-field.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      <div className="row tm-row">
        <div className="col-lg-8 tm-post-col">
          <div className="tm-post-full">
            <div className="mb-4">
              <h2 className="pt-2 tm-color-primary tm-post-title">Single Post of Xtra Blog HTML Template</h2>
              <p className="tm-mb-40">June 16, 2020 posted by Admin Nat</p>
              <p>
                This is a description of the video post. You can also have an image instead of the video. You can free download <a rel="nofollow" href="https://templatemo.com/tm-553-xtra-blog" target="_blank">Xtra Blog Template</a> from TemplateMo website.
              </p>
              <p>
                Duis pretium efficitur nunc. Mauris vehicula nibh nisi. Curabitur gravida neque dignissim, aliquet nulla sed, condimentum nulla. Pellentesque id venenatis quam, id cursus velit.
              </p>
              <span className="d-block text-right tm-color-primary">Creative . Design . Business</span>
            </div>

            <div>
              <h2 className="tm-color-primary tm-post-title">Comments</h2>
              <hr className="tm-hr-primary tm-mb-45" />

              <div className="tm-comment tm-mb-45">
                <figure className="tm-comment-figure">
                  <img src="/img/comment-1.jpg" alt="Image" className="mb-2 rounded-circle img-thumbnail" />
                  <figcaption className="tm-color-primary text-center">Mark Sonny</figcaption>
                </figure>
                <div>
                  <p>
                    Praesent aliquam ex vel lectus ornare tritique. Nunc et eros quis enim feugiat tincidunt et vitae dui. Nullam consectetur justo ac ex laoreet rhoncus.
                  </p>
                  <div className="d-flex justify-content-between">
                    <a href="#" className="tm-color-primary">REPLY</a>
                    <span className="tm-color-primary">June 14, 2020</span>
                  </div>
                </div>
              </div>

              <div className="tm-comment-reply tm-mb-45">
                <hr />
                <div className="tm-comment">
                  <figure className="tm-comment-figure">
                    <img src="/img/comment-2.jpg" alt="Image" className="mb-2 rounded-circle img-thumbnail" />
                    <figcaption className="tm-color-primary text-center">Jewel Soft</figcaption>
                  </figure>
                  <p>
                    Nunc et eros quis enim feugiat tincidunt et vitae dui. Nullam consectetur justo ac ex laoreet rhoncus. Nunc id leo pretium, faucibus sapien vel, euismod turpis.
                  </p>
                </div>
                <span className="d-block text-right tm-color-primary">June 21, 2020</span>
              </div>

              <form className="mb-5 tm-comment-form">
                <h2 className="tm-color-primary tm-post-title mb-4">Your comment</h2>
                <div className="mb-4">
                  <input className="form-control" name="name" type="text" />
                </div>
                <div className="mb-4">
                  <input className="form-control" name="email" type="text" />
                </div>
                <div className="mb-4">
                  <textarea className="form-control" name="message" rows={6} />
                </div>
                <div className="text-right">
                  <button className="tm-btn tm-btn-primary tm-btn-small" type="button">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <aside className="col-lg-4 tm-aside-col">
          <div className="tm-post-sidebar">
            <hr className="mb-3 tm-hr-primary" />
            <h2 className="mb-4 tm-post-title tm-color-primary">Categories</h2>
            <ul className="tm-mb-75 pl-5 tm-category-list">
              <li><a href="#" className="tm-color-primary">Visual Designs</a></li>
              <li><a href="#" className="tm-color-primary">Travel Events</a></li>
              <li><a href="#" className="tm-color-primary">Web Development</a></li>
              <li><a href="#" className="tm-color-primary">Video and Audio</a></li>
              <li><a href="#" className="tm-color-primary">Etiam auctor ac arcu</a></li>
              <li><a href="#" className="tm-color-primary">Sed im justo diam</a></li>
            </ul>
            <hr className="mb-3 tm-hr-primary" />
            <h2 className="tm-mb-40 tm-post-title tm-color-primary">Related Posts</h2>
            <a href="#" className="d-block tm-mb-40">
              <figure>
                <img src="/img/img-02.jpg" alt="Image" className="mb-3 img-fluid" />
                <figcaption className="tm-color-primary">Duis mollis diam nec ex viverra scelerisque a sit</figcaption>
              </figure>
            </a>
            <a href="#" className="d-block tm-mb-40">
              <figure>
                <img src="/img/img-05.jpg" alt="Image" className="mb-3 img-fluid" />
                <figcaption className="tm-color-primary">Integer quis lectus eget justo ullamcorper ullamcorper</figcaption>
              </figure>
            </a>
            <a href="#" className="d-block tm-mb-40">
              <figure>
                <img src="/img/img-06.jpg" alt="Image" className="mb-3 img-fluid" />
                <figcaption className="tm-color-primary">Nam lobortis nunc sed faucibus commodo</figcaption>
              </figure>
            </a>
          </div>
        </aside>
      </div>

      <footer className="row tm-row">
        <div className="col-md-6 col-12 tm-color-gray">
          Design: <a rel="nofollow" target="_parent" href="https://templatemo.com" className="tm-external-link">TemplateMo</a>
        </div>
        <div className="col-md-6 col-12 tm-color-gray tm-copyright">
          Copyright 2020 Xtra Blog Company Co. Ltd.
        </div>
      </footer>
    </>
  )
}

function AboutPage() {
  return (
    <>
      <div className="row tm-row">
        <div className="col-12">
          <form className="form-inline tm-mb-80 tm-search-form">
            <input className="form-control tm-search-input" name="query" type="text" placeholder="Search..." aria-label="Search" />
            <button className="tm-search-button" type="submit">
              <i className="fas fa-search tm-search-icon" aria-hidden="true" />
            </button>
          </form>
        </div>
      </div>

      <div className="row tm-row tm-mb-45">
        <div className="col-12">
          <hr className="tm-hr-primary tm-mb-55" />
          <img src="/img/about-01.jpg" alt="About" className="img-fluid" />
        </div>
      </div>

      <div className="row tm-row tm-mb-40">
        <div className="col-12">
          <div className="mb-4">
            <h2 className="pt-2 tm-mb-40 tm-color-primary tm-post-title">About this xtra blog</h2>
            <p>
              You can immediately download <a rel="nofollow" href="https://templatemo.com/tm-553-xtra-blog" target="_blank">Xtra Blog Template</a> from TemplateMo website for 100% free of charge.
            </p>
            <p>
              Proin et arcu ligula. Praesent quis erat eu est sollicitudin tristique ut in arcu. Donec bibendum ex id ligula semper dictum.
            </p>
          </div>
        </div>
      </div>

      <div className="row tm-row tm-mb-120">
        <div className="col-lg-4 tm-about-col">
          <div className="tm-bg-gray tm-about-pad">
            <div className="text-center tm-mt-40 tm-mb-60">
              <i className="fas fa-bezier-curve fa-4x tm-color-primary" />
            </div>
            <h2 className="mb-3 tm-color-primary tm-post-title">Background</h2>
            <p className="mb-0 tm-line-height-short">Phasellus pulvinar nisl ornare leo porttitor, et vestibulum lorem semper.</p>
          </div>
        </div>
        <div className="col-lg-4 tm-about-col">
          <div className="tm-bg-gray tm-about-pad">
            <div className="text-center tm-mt-40 tm-mb-60">
              <i className="fas fa-users-cog fa-4x tm-color-primary" />
            </div>
            <h2 className="mb-3 tm-color-primary tm-post-title">Teamwork</h2>
            <p className="mb-0 tm-line-height-short">Suspendisse ullamcorper, mi vel molestie ornare, arcu magna euismod ipsum, in malesuada nulla magna ut enim.</p>
          </div>
        </div>
        <div className="col-lg-4 tm-about-col">
          <div className="tm-bg-gray tm-about-pad">
            <div className="text-center tm-mt-40 tm-mb-60">
              <i className="fab fa-creative-commons-sampling fa-4x tm-color-primary" />
            </div>
            <h2 className="mb-3 tm-color-primary tm-post-title">Our Core Value</h2>
            <p className="mb-0 tm-line-height-short">Nunc mi ante, suscipit vel dapibus et, volutpat sit amet ante. In tempor nec sem vitae varius.</p>
          </div>
        </div>
      </div>

      <div className="row tm-row tm-mb-60">
        <div className="col-12">
          <hr className="tm-hr-primary tm-mb-55" />
        </div>
        {[
          ['John Henry', 'CEO/Founder', '/img/about-02.jpg'],
          ['Timy Cake', 'Project Director', '/img/about-03.jpg'],
          ['Jay Zoona', 'Supervisor', '/img/about-04.jpg'],
          ['Catherine Soft', 'Team Leader', '/img/about-05.jpg'],
        ].map(([name, role, image]) => (
          <div key={name} className="col-lg-6 tm-mb-60 tm-person-col">
            <div className="media tm-person">
              <img src={image} alt="Image" className="img-fluid mr-4" />
              <div className="media-body">
                <h2 className="tm-color-primary tm-post-title mb-2">{name}</h2>
                <h3 className="tm-h3 mb-3">{role}</h3>
                <p className="mb-0 tm-line-height-short">Aliquam non vulputate lectus, vel ultricies diam. Suspendisse at ipsum hendrerit, vestibulum mi id, mattis tortor.</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <footer className="row tm-row">
        <div className="col-md-6 col-12 tm-color-gray">
          Design: <a rel="nofollow" target="_parent" href="https://templatemo.com" className="tm-external-link">TemplateMo</a>
        </div>
        <div className="col-md-6 col-12 tm-color-gray tm-copyright">
          Copyright 2020 Xtra Blog Company Co. Ltd.
        </div>
      </footer>
    </>
  )
}

function ContactPage() {
  return (
    <>
      <div className="row tm-row">
        <div className="col-12">
          <form className="form-inline tm-mb-80 tm-search-form">
            <input className="form-control tm-search-input" name="query" type="text" placeholder="Search..." aria-label="Search" />
            <button className="tm-search-button" type="submit">
              <i className="fas fa-search tm-search-icon" aria-hidden="true" />
            </button>
          </form>
        </div>
      </div>

      <div className="row tm-row tm-mb-45">
        <div className="col-12">
          <hr className="tm-hr-primary tm-mb-55" />
          <div className="gmap_canvas">
            <iframe
              width="100%"
              height="477"
              id="gmap_canvas"
              title="Location map"
              src="https://maps.google.com/maps?q=Av.+L%C3%BAcio+Costa,+Rio+de+Janeiro+-+RJ,+Brazil&t=&z=13&ie=UTF8&iwloc=&output=embed"
              frameBorder="0"
              scrolling="no"
              marginHeight={0}
              marginWidth={0}
            />
          </div>
        </div>
      </div>

      <div className="row tm-row tm-mb-120">
        <div className="col-12">
          <h2 className="tm-color-primary tm-post-title tm-mb-60">Contact Us</h2>
        </div>
        <div className="col-lg-7 tm-contact-left">
          <form className="mb-5 ml-auto mr-0 tm-contact-form">
            <div className="form-group row mb-4">
              <label htmlFor="name" className="col-sm-3 col-form-label text-right tm-color-primary">Name</label>
              <div className="col-sm-9">
                <input className="form-control mr-0 ml-auto" name="name" id="name" type="text" required />
              </div>
            </div>
            <div className="form-group row mb-4">
              <label htmlFor="email" className="col-sm-3 col-form-label text-right tm-color-primary">Email</label>
              <div className="col-sm-9">
                <input className="form-control mr-0 ml-auto" name="email" id="email" type="email" required />
              </div>
            </div>
            <div className="form-group row mb-4">
              <label htmlFor="subject" className="col-sm-3 col-form-label text-right tm-color-primary">Subject</label>
              <div className="col-sm-9">
                <input className="form-control mr-0 ml-auto" name="subject" id="subject" type="text" required />
              </div>
            </div>
            <div className="form-group row mb-5">
              <label htmlFor="message" className="col-sm-3 col-form-label text-right tm-color-primary">Message</label>
              <div className="col-sm-9">
                <textarea className="form-control mr-0 ml-auto" name="message" id="message" rows={8} required />
              </div>
            </div>
            <div className="form-group row text-right">
              <div className="col-12">
                <button className="tm-btn tm-btn-primary tm-btn-small" type="button">Submit</button>
              </div>
            </div>
          </form>
        </div>

        <div className="col-lg-5 tm-contact-right">
          <address className="mb-4 tm-color-gray">
            120 Lorem ipsum dolor sit amet, consectetur adipiscing 10550
          </address>
          <span className="d-block">
            Tel:
            <a href="tel:060-070-0980" className="tm-color-gray">060-070-0980</a>
          </span>
          <span className="mb-4 d-block">
            Email:
            <a href="mailto:info@company.com" className="tm-color-gray">info@company.com</a>
          </span>
          <p className="mb-5 tm-line-height-short">
            Maecenas eu mi eu dui cursus consequat non eu metus. Morbi ac turpis eleifend, commodo purus eget, commodo mauris.
          </p>
          <ul className="tm-social-links">
            {['facebook', 'twitter', 'youtube', 'instagram'].map((platform) => (
              <li key={platform} className="mb-2">
                <a href="https://example.com" className="d-flex align-items-center justify-content-center">
                  <i className={`fab fa-${platform}`} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <footer className="row tm-row">
        <div className="col-md-6 col-12 tm-color-gray">
          Design: <a rel="nofollow" target="_parent" href="https://templatemo.com" className="tm-external-link">TemplateMo</a>
        </div>
        <div className="col-md-6 col-12 tm-color-gray tm-copyright">
          Copyright 2020 Xtra Blog Company Co. Ltd.
        </div>
      </footer>
    </>
  )
}

function AuthPage({ mode, onLogin }: { mode: AuthMode; onLogin: () => void }) {
  const isLogin = mode === 'login'
  const navigate = useNavigate()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (isLogin) {
      onLogin()
      return
    }

    navigate('/login')
  }

  return (
    <div className="row tm-row auth-page">
      <div className="col-12">
        <div className="auth-shell">
          <div className="auth-card">
            <div className="auth-header">
              <span className="auth-badge">Member Access</span>
              <h2 className="tm-color-primary tm-post-title auth-title">
                {isLogin ? 'Welcome back' : 'Create your account'}
              </h2>
              <p className="auth-subtitle">
                {isLogin
                  ? 'Sign in to continue reading and managing your blog updates.'
                  : 'Register to join the community and start publishing your ideas.'}
              </p>
            </div>

            <form className="auth-form" onSubmit={handleSubmit}>
              {!isLogin && (
                <div className="auth-field">
                  <label htmlFor="fullName">Full name</label>
                  <input id="fullName" name="fullName" type="text" placeholder="John Smith" />
                </div>
              )}

              <div className="auth-field">
                <label htmlFor="email">Email address</label>
                <input id="email" name="email" type="email" placeholder="you@example.com" />
              </div>

              <div className="auth-field">
                <label htmlFor="password">Password</label>
                <input id="password" name="password" type="password" placeholder="••••••••" />
              </div>

              {!isLogin && (
                <div className="auth-field">
                  <label htmlFor="confirmPassword">Confirm password</label>
                  <input id="confirmPassword" name="confirmPassword" type="password" placeholder="Repeat your password" />
                </div>
              )}

              <button className="tm-btn tm-btn-primary auth-submit" type="submit">
                {isLogin ? 'Login' : 'Register'}
              </button>

              <div className="auth-footer">
                <span>{isLogin ? 'Need an account?' : 'Already a member?'}</span>
                <NavLink to={isLogin ? '/register' : '/login'} className="auth-link">
                  {isLogin ? 'Register here' : 'Login here'}
                </NavLink>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
