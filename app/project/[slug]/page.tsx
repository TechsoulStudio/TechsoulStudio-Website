"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { FaArrowLeft } from "react-icons/fa6";
import { useState, useEffect } from "react";
import { RiMenu3Fill } from "react-icons/ri";
import ProjectModal from "@/components/ProjectModal";
import Menu from "@/components/helper/Menu";
import VerticalTextLabel from "@/components/VerticalTextLabel";
import dynamic from "next/dynamic";
import RelatedProjects from "@/components/RelatedProjects";
import { fetchProjects, Project } from "@/Service/api";

const Footer = dynamic(() => import("@/components/helper/Footer"), {
  ssr: false,
});

export default function ProjectDetailsPage() {
  const { slug } = useParams();
  const router = useRouter();

  const [openMenu, setOpenMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [project, setProject] = useState<Project | null>(null);
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProject = async () => {
      try {
        const projects = await fetchProjects();
        setAllProjects(projects);

        const found = projects.find((p) => p.slug === slug);
        setProject(found || null);
      } catch (err) {
        console.error("Failed to fetch project", err);
      } finally {
        setLoading(false);
      }
    };
    loadProject();
  }, [slug]);

  useEffect(() => {
    // document.body.style.overflow = showModal ? "hidden" : "auto";
  }, [showModal]);

  if (loading) return ;
  if (!project) return <p className="p-10 text-white">Project not found.</p>;

  const images = project.images || [];

  return (
    <div>
      <div className="fixed top-4 right-4 z-50 overflow-hidden">
        <button onClick={() => setOpenMenu(true)} className="p-4 text-white">
          <RiMenu3Fill size={36} className="text-[#dad9d6]" />
        </button>
      </div>
      {openMenu && <Menu onClose={() => setOpenMenu(false)} />}

      <section className="relative w-full sticky top-0 z-10">
        <div className="h-[80vh] bg-[#bcbcb4] text-[#81837e] px-4 lg:px-10 flex flex-col justify-between">
          <div className="py-8">
            <div
              className="text-lg font-bold cursor-pointer group"
              onClick={() => router.push("/project")}
            >
              <FaArrowLeft className="inline-block mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Projects
            </div>
          </div>

          <div className="pb-6 max-w-3xl">
            <h1 className="text-4xl font-bold">{project.title}</h1>
            <h2 className="text-2xl font-bold pt-4">{project.category}</h2>
          </div>

          <div className="py-10">
            <button
              onClick={() => setShowModal(true)}
              className="text-xl font-bold cursor-pointer"
            >
              Project Detail +
            </button>
          </div>
        </div>
      </section>

      <section className="relative z-10">
        <div className="bg-[#5a5d59] text-[#dad9d6] px-4 lg:px-10 py-10">
          {project.image && (
            <div className="w-full h-[350px] sm:min-h-[110vh] relative overflow-hidden mb-10">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          {images[0] && (
            <div className="grid md:grid-cols-2 gap-10 py-10">
              <div className="w-full flex justify-center">
                <Image
                  src={images[0]}
                  alt={project.title}
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          )}

          {images[1] || images[2] ? (
            <div className="flex flex-col md:flex-row gap-6 mb-10">
              {images.slice(1, 3).map(
                (img, i) =>
                  img && (
                    <div
                      key={i}
                      className="w-full md:w-1/2 flex justify-center"
                    >
                      <Image
                        src={img}
                        alt={project.title}
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="w-full h-auto object-contain"
                      />
                    </div>
                  )
              )}
            </div>
          ) : null}

          {images[3] && (
            <div className="grid md:grid-cols-2 gap-10 py-10">
              <div></div>
              <div className="w-full flex justify-center">
                <Image
                  src={images[3]}
                  alt={project.title}
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          )}

          {images[4] || images[5] || images[6] ? (
            <div className="flex flex-col md:flex-row md:flex-wrap gap-6 pt-10 pb-10">
              {images.slice(4, 7).map(
                (img, i) =>
                  img && (
                    <div
                      key={i}
                      className="w-full md:w-[32%] flex justify-center"
                    >
                      <Image
                        src={img}
                        alt={`${project.title} - ${i + 5}`}
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="w-full h-auto object-contain"
                      />
                    </div>
                  )
              )}
            </div>
          ) : null}

          {images.slice(8).length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-10 pb-10">
              {images.slice(8).map(
                (img, i) =>
                  img && (
                    <div key={i} className="w-full flex justify-center">
                      <Image
                        src={img}
                        alt={`${project.title} - ${i + 8}`}
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="w-full h-auto object-contain"
                      />
                    </div>
                  )
              )}
            </div>
          )}

          {images[7] && (
            <div className="w-full h-[350px] sm:min-h-[110vh] relative overflow-hidden mb-10">
              <Image
                src={images[7]}
                alt={`${project.title} final`}
                fill
                className="object-cover"
              />
            </div>
          )}

          <RelatedProjects
            currentSlug={project.slug}
            allProjects={allProjects}
            currentServices={project.services}
          />
        </div>

        <Footer />

        <div className="sm:flex fixed right-5 bottom-[100px] z-10">
          <VerticalTextLabel />
        </div>
      </section>

      <ProjectModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={project.title}
        services={project.services}
        // webUrl={project.webUrl}
        description={project.description}
        details={project.details}
      />
    </div>
  );
}
