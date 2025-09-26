"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetchTeamMembers } from "@/Service/api";

interface TeamMember {
  _id: string;
  name: string;
  role: string;
  image: string;
  link?: string;
}

const TeamSection: React.FC = () => {
  const [team, setTeam] = useState<TeamMember[]>([]);

  useEffect(() => {
    const loadTeam = async () => {
      try {
        const members = await fetchTeamMembers();
        setTeam(members);
      } catch (error) {
        console.error("Failed to fetch team members", error);
      }
    };
    loadTeam();
  }, []);

  return (
    <section className="bg-[#bcbcb4] py-20 px-4 sm:px-6 md:px-8 lg:px-10 text-[#84837e] font-sans">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-14">
        <motion.h2
          className="text-xl sm:text-2xl font-bold leading-tight mb-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          TechsoulStudio Team —
        </motion.h2>

        {team.map((member, index) => (
          <motion.div
            key={member._id}
            className="w-full overflow-hidden"
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <div className="relative w-full h-100 aspect-square">
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover"
              />
            </div>
            <h3 className="mt-4 text-lg text-[#5a5d59] font-semibold">
              {member.name}
            </h3>
            <p className="text-md text-[#898a85]">{member.role}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TeamSection;
