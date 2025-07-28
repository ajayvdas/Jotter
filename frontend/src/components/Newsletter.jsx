import { motion } from "framer-motion"
import { Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"



export default function Newsletter({ email, setEmail }) {
  return (
 <motion.section
        className="bg-black text-white py-16 border-t-8 border-red-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-black mb-4">NEVER MISS A BLOG!</h2>
          <p className="text-xl mb-8 font-bold">Subscribe to get the latest blog, new tech, and exclusive news.</p>

          <div className="flex max-w-md mx-auto">
            <Input
              placeholder="Enter your email id"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-4 border-white rounded-none font-bold text-lg bg-white text-black"
            />
            <Button className="bg-red-500 text-white font-black border-4 border-white border-l-0 rounded-none hover:bg-red-600">
              <Mail className="w-5 h-5 mr-2" />
              SUBSCRIBE
            </Button>
          </div>
        </div>
      </motion.section>
  )
}
