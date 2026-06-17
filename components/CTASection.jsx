"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  FaTrello,
  FaReact,
  FaAws,
  FaLaptopCode,
  FaHandsHelping,
} from "react-icons/fa";
import { SiMicrosoftazure } from "react-icons/si";
import { MdComputer } from "react-icons/md";

const skills = [
  {
    title: "Project Management",
    description:
      "Experienced in managing projects using Agile methodologies, ensuring timely and budget-compliant delivery with a focus on client satisfaction and technical excellence.",
    color: "#3b82f6",
    icon: <FaTrello size={40} />,
    key: "project-management",
  },
  {
    title: "Full Stack Development",
    description:
      "Proficient in building and maintaining end-to-end solutions with proficiency in Python, JavaScript, React, and frameworks such as Django and Flask.",
    color: "#10b981",
    icon: <FaReact size={40} />,
    key: "full-stack",
  },
  {
    title: "Cloud Administration",
    description:
      "Skilled in managing and optimizing cloud infrastructure using Azure and AWS to ensure scalability, reliability, and enhanced data security.",
    color: "#f59e0b",
    icon: (
      <div className="flex gap-2 items-center">
        <FaAws size={40} />
        <SiMicrosoftazure size={32} />
      </div>
    ),
    key: "cloud",
  },
  {
    title: "Microsoft Azure Fundamentals",
    description:
      "Certified in Microsoft Azure Fundamentals, with a strong understanding of cloud concepts, core Azure services, and Azure management tools.",
    color: "#8b5cf6",
    icon: <SiMicrosoftazure size={40} />,
    key: "azure",
  },
  {
    title: "Full Stack Software Engineering",
    description:
      "Proficient in both front-end and back-end development, with expertise in various programming languages and frameworks.",
    color: "#f97316",
    icon: <FaLaptopCode size={40} />,
    key: "full-stack-cert",
  },
];

export default function CTASection() {
  const [activeKey, setActiveKey] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [popoverPos, setPopoverPos] = useState(null);
  const keywordRefs = useRef({});

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const openPopover = (key) => {
    const rect = keywordRefs.current[key]?.getBoundingClientRect();
    if (!rect) return;

    setPopoverPos({
      top: rect.bottom + window.scrollY + 10,
      left: rect.left + window.scrollX + rect.width / 2,
    });

    setActiveKey(key);
  };

  const keywordEvents = (key) => ({
    ref: (el) => (keywordRefs.current[key] = el),
    onMouseEnter: () => !isMobile && openPopover(key),
    onMouseLeave: () => !isMobile && setActiveKey(null),
    onClick: () => isMobile && setActiveKey(key),

    style: {
      padding: "4px 10px",
      borderRadius: "12px",
      backgroundColor: skills.find((s) => s.key === key)?.color + "22",
      color: skills.find((s) => s.key === key)?.color,
      cursor: "pointer",
      fontWeight: 600,
      transition: "all 0.2s ease",
      display: "inline-block",
    },
  });

  const activeSkill = activeKey
    ? skills.find((s) => s.key === activeKey)
    : null;

  return (
    <section id="about" className="px-0 py-0">
      <div
        className="
          max-w-3xl mx-auto p-8 rounded-2xl shadow-2xl
          backdrop-blur-xl border transition-all
          bg-gradient-to-br from-white/40 to-white/10
          dark:from-black/40 dark:to-black/20
          border-white/40 dark:border-white/10
          text-black dark:text-white
        "
      >
        <div className="flex justify-center items-center gap-4 mb-4">
          <FaHandsHelping size={32} />
          <h2 className="text-3xl font-bold">About Me</h2>
          <MdComputer size={32} />
        </div>

        <p className="leading-relaxed text-lg">
          I'm Jaichuang Stellmacher, a{" "}
          <strong>
            motivated (Cloud, Data, Digital) Information Technology Consultant
          </strong>{" "}
          with hands-on experience in{" "}
          <span {...keywordEvents("cloud")}>cloud computing</span>,{" "}
          <span {...keywordEvents("full-stack")}>full-stack development</span>,
          and{" "}
          <span {...keywordEvents("project-management")}>
            project management
          </span>
          .
        </p>

        <p className="leading-relaxed text-lg mt-4">
          I hold a BS in Business Administration with dual majors in{" "}
          <em>Management Information Systems and Marketing</em> from the{" "}
          <a
            href="https://eller.arizona.edu/why/rankings"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-300 font-semibold"
          >
            University of Arizona's Eller College of Management
          </a>
          , consistently ranked as a top MIS program (#2 public, #3 overall).
        </p>

        <p className="leading-relaxed text-lg mt-4">
          I am certified in{" "}
          <span {...keywordEvents("azure")}>Microsoft Azure Fundamentals</span>{" "}
          and{" "}
          <span {...keywordEvents("full-stack-cert")}>
            Full Stack Software Engineering
          </span>
          .
        </p>
      </div>

      {/* MOBILE MODAL */}
      {isMobile && activeSkill && (
        <div
          onClick={() => setActiveKey(null)}
          className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="p-6 rounded-xl shadow-2xl text-white max-w-sm w-[90%] text-center"
            style={{ backgroundColor: activeSkill.color }}
          >
            <div className="mb-4">{activeSkill.icon}</div>
            <h3 className="text-xl font-bold mb-2">{activeSkill.title}</h3>
            <p>{activeSkill.description}</p>
          </div>
        </div>
      )}

      {/* DESKTOP POPOVER */}
      {!isMobile && activeSkill && popoverPos && (
        <div
          className="absolute z-50 w-64 p-4 rounded-xl text-white shadow-xl text-center"
          style={{
            top: popoverPos.top,
            left: popoverPos.left,
            transform: "translateX(-50%)",
            backgroundColor: activeSkill.color,
          }}
          onMouseEnter={() => setActiveKey(activeSkill.key)}
          onMouseLeave={() => setActiveKey(null)}
        >
          <div className="mb-2">{activeSkill.icon}</div>
          <h4 className="font-bold text-lg mb-1">{activeSkill.title}</h4>
          <p className="text-sm">{activeSkill.description}</p>

          <div
            className="absolute w-0 h-0 border-l-8 border-r-8 border-b-8"
            style={{
              top: "-8px",
              left: "50%",
              transform: "translateX(-50%)",
              borderLeftColor: "transparent",
              borderRightColor: "transparent",
              borderBottomColor: activeSkill.color,
            }}
          />
        </div>
      )}
    </section>
  );
}
