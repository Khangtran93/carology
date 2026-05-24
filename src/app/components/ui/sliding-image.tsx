'use client'
import Image from "next/image"
import { motion } from 'motion/react'
export default function SlidingImage() {
  return (
    <div>
    <motion.div
    initial={{ scale: 1, opacity: 0 }}
    animate={{ scale: 1.3, opacity: 1 }}
    transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <Image src='/images/audi-a7-front.png' alt="vehicle" width={500} height={300}/>
    </motion.div>
  </div>
  )
}