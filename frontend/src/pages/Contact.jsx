const Contact = () => (
  <div className="max-w-3xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
    <h1 className="text-3xl font-bold mb-8 text-white text-center">Contact Us</h1>
    <div className="glass-card p-8">
      <form className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Name</label>
          <input type="text" className="w-full bg-dark-100 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-500 transition-colors" placeholder="John Doe" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
          <input type="email" className="w-full bg-dark-100 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-500 transition-colors" placeholder="john@example.com" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Message</label>
          <textarea rows={4} className="w-full bg-dark-100 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-500 transition-colors" placeholder="Your message here..."></textarea>
        </div>
        <button type="button" className="w-full btn-primary py-3">Send Message</button>
      </form>
    </div>
  </div>
);
export default Contact;