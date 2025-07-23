import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export function Home() {
  return (
    <div className="min-h-screen  flex flex-col items-center px-4 py-12">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl font-bold text-cyan-700 mb-4">Welcome to Nova</h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          Your secure, modern digital banking solution. Access your finances with ease, manage your accounts, and stay informed — all from one place.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/login">
            <button className="px-6 py-3 text-lg rounded-xl shadow-md">Login</button>
          </Link>
          
        </div>
      </motion.div>

      <motion.div
        className="grid md:grid-cols-3 gap-6 mt-16 max-w-6xl w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <FeatureCard
          title="Secure Banking"
          description="We use advanced encryption and security standards to keep your data safe and private."
        />
        <FeatureCard
          title="Client Dashboard"
          description="Easily monitor your accounts, transfer funds, and track your transaction history."
        />
        <FeatureCard
          title="Employee Tools"
          description="Our staff dashboard gives employees powerful tools to manage client needs efficiently."
        />
      </motion.div>

      <motion.div
        className="mt-20 text-center text-gray-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <p className="text-sm">&copy; 2025 Nova. All rights reserved.</p>
      </motion.div>
    </div>
  );
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition duration-300">
      <h2 className="text-xl font-semibold text-cyan-700 mb-2">{title}</h2> {/* Changed this line */}
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}
