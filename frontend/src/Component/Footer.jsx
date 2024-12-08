import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const Footer = () => {
  return (
    <>
    

<footer className="bg-white dark:bg-gray-900 mt-52">
    <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
              <a href="#" className="flex items-center">
                  <img src={assets.logo} className="h-10 me-6" alt="FlowBite Logo" />
              </a>
                  <p className="self-center text-sm mt-3 font-outfit font-weight-400 whitespace-nowrap dark:text-white">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem <br /> Ipsum has been the industry's standard dummy text ever since the 1500s, when <br /> an unknown printer took a galley of type <br /> and scrambled it to make a type specimen book.</p>
          </div>
          <div className="grid grid-cols-2 px-10 gap-8 sm:gap-6 sm:grid-cols-3">
              <div>
                  <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Company</h2>
                  <ul className="text-gray-500 dark:text-gray-400 font-medium">
                      <li className="mb-3">
                          <a href="https://flowbite.com/" className="hover:underline">Home</a>
                      </li>
                      <li className="mb-3">
                          <a href="https://tailwindcss.com/" className="hover:underline">About us</a>
                      </li>
                      <li className="mb-3">
                          <a href="https://tailwindcss.com/" className="hover:underline">Contact us </a>
                      </li>
                      <li className="mb-3">
                          <a href="https://tailwindcss.com/" className="hover:underline">Privacy Policy</a>
                      </li>
                  </ul>
              </div>
              
              <div>
                  <h2 className="mb-6 text-sm font-semibold  text-gray-900 uppercase dark:text-white">Get in Touch</h2>
                  <ul className="text-gray-500 dark:text-gray-400 font-medium">
                      <li className="mb-4">
                          <a href="#" className="hover:underline">+1-212-456-7890</a>
                      </li>
                      <li className="mb-4">
                          <a href="#" className="hover:underline">greatstackdev@gmail.com</a>
                      </li>
                      
                  </ul>
              </div>
          </div>
      </div>
      <hr className="my-6 border-gray-200 bg-gray-600 h-0.5 w-full text-center mx-auto sm:mx-auto dark:border-gray-700 lg:my-8" />
      
      <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://flowbite.com/" className="hover:underline">Flowbite™</a>. All Rights Reserved.</span>
    </div>
</footer>

      
    </>
  )
}

export default Footer
