import { motion } from "framer-motion";
export function About() {
  return (
    <div className="min-h-screen bg-white text-gray-800 px-6 py-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-center mb-8 text-cyan-700">About Us</h1>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
          <p className="text-lg leading-relaxed">
            At <span className="font-semibold text-cyan-600">Nova</span>, our mission is to empower individuals and businesses through secure, reliable, and innovative financial services. We aim to provide easy access to banking for everyone—everywhere, at any time.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-3">Our Vision</h2>
          <p className="text-lg leading-relaxed">
            We envision a world where banking is fast, transparent, and accessible. With cutting-edge technology and a customer-first mindset, we’re redefining how people manage their finances.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Meet Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-100 p-6 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-lg font-bold mb-1">Sarah Ahmed</h3>
              <p className="text-sm text-gray-600">Chief Executive Officer</p>
              <p className="mt-2 text-sm">Leading the way with innovation and strategy.</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-lg font-bold mb-1">Khaled Ben Ali</h3>
              <p className="text-sm text-gray-600">Head of Technology</p>
              <p className="mt-2 text-sm">Building secure and scalable banking platforms.</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-lg font-bold mb-1">Layla Bensalah</h3>
              <p className="text-sm text-gray-600">Customer Relations Manager</p>
              <p className="mt-2 text-sm">Ensuring top-notch support for all our clients.</p>
            </div>
          </div>
        </section>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center mt-10"
        >
          
        </motion.div>
      </motion.div>
    </div>
  );
}
