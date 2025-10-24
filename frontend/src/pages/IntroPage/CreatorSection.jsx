import React from "react";
import { BsGithub, BsLinkedin, BsInstagram } from "react-icons/bs";
import { Sparkle } from "lucide-react";
import logo from '../../assets/logo.svg';
const CreatorSection = () => {
  return (
    <footer className="footer bg-black text-white py-12">
      <div className="footer-top px-6 flex flex-col md:flex-row justify-center gap-12">
        {/* Creator Info */}
        <div className="footer-column md:w-1/2">
          <div className="flex items-center mb-4 justify-center">
            <Sparkle className="w-8 h-8 text-cyan-400 mr-2" />
            <h3 className="text-3xl font-bold ">MONEVO</h3>
          </div>
          <p className="text-gray-400 mb-6 text-center">
            Monevo is your smart expense companion — helping you track, analyze, and
            understand your spending habits with clarity and ease. Designed to bring
            financial awareness and simplicity to your everyday life.
          </p>
          <p className="text-gray-500 italic text-center">
            Created with passion and code <br /> by Dhruv Gupta
          </p>
        </div>
      </div>

      {/* Logo + Social Links */}
      <div className=" mt-12 flex flex-col md:flex-row items-center justify-around text-center max-w-5xl mx-auto ">
        <div className="mb-12 md:mb-0">
          <div className="flex items-center justify-center mb-1">
            <span className=" text-2xl font-bold text-white">
              Dhruv Gupta
            </span>
          </div>
          <span className="text-sm text-gray-400 mt-1">
            Turning ideas into interactive experiences.
          </span>
        </div>
        <div>
          <h3 className="text-2xl font-semibold mb-5">Social Links</h3>
          <div className="flex gap-6 mt-2 justify-center">
            <a
              href="https://dhruvgupta31.web.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform duration-300 -translate-y-2"
            >
              <img
                src={logo}
                alt="Dhruv Gupta Portfolio Logo"
                className="w-10 h-10 rounded-full border-gray-700  transition"
              />
            </a>
            <a
              href="https://www.linkedin.com/in/dhruv-gupta-794968244/"
              target="_blank"
              rel="noopener noreferrer"
              className=" hover:text-cyan-400 transition"
            >
              <BsLinkedin className="text-2xl" />
            </a>
            <a
              href="https://github.com/Dhruv3110"
              target="_blank"
              rel="noopener noreferrer"
              className=" hover:text-gray-400 transition"
            >
              <BsGithub className="text-2xl" />
            </a>
            <a
              href="https://www.instagram.com/dhruvgupta7124/"
              target="_blank"
              rel="noopener noreferrer"
              className=" hover:text-red-400 transition"
            >
              <BsInstagram className="text-2xl" />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <p className=" text-gray-500 text-center mt-8 border-t p-6 max-w-3xl mx-auto text-sm ">
        &copy; 2025 Monevo — Designed & Developed by Dhruv Gupta. <br />
        Empowering smarter spending, one click at a time.
      </p>
    </footer>
  );
};

export default CreatorSection;
