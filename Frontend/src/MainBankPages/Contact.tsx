import { motion } from "framer-motion";

export function Contact() {
  return (  
    
    <div className="min-h-screen bg-white text-gray-800 px-6 py-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-center mb-8 text-cyan-700">Contact Us</h1>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-3">Get In Touch</h2>
          <p className="text-lg leading-relaxed mb-6">
            If you have any questions or need assistance, please fill out the form below, and we will get back to you as soon as possible.
          </p>

          <motion.form
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
           
            <input
              type="email"
              placeholder="Your Email"
              className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              placeholder="Your Message"
              rows={6}
              className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 col-span-2"
            ></textarea>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
               onClick={()=>{}}
              className="col-span-2 bg-cyan-600 font-semibold text-white py-3 px-6 rounded-lg shadow-lg hover:bg-cyan-600 transition duration-200"
            >
              Send Message
            </motion.button>
          </motion.form>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-6">Our Address</h2>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center"
          >
            <p className="text-lg text-center">
              <span className="font-bold text-gray-800">Nova Headquarters</span>
            </p>
            <p className="text-lg text-center mt-2">
              1234 Bank Street, Suite 101
            </p>
            <p className="text-lg text-center mt-2">
              Cityville, XYZ 12345, Country
            </p>
            <div className="mt-6">
              <p className="font-semibold text-lg">Phone</p>
              <p className="text-gray-600">+123 456 7890</p>
            </div>
            <div className="mt-4">
              <p className="font-semibold text-lg">Email</p>
              <p className="text-gray-600">support@Nova.com</p>
            </div>
          </motion.div>
        </section>
      </motion.div>
    </div>
  );
}
