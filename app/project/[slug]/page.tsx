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

  if (loading) return;
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
          {images[0] && (
            <div className="w-full h-[400px] sm:min-h-[110vh] relative overflow-hidden mb-10">
              <Image
                src={images[0]}
                alt={`${project.title} first`}
                fill
                className="object-cover"
              />
            </div>
          )}

          {images.length > 7 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-10">
              {images
                .slice(1, 4)
                .concat(images.slice(7, images.length - 1))
                .map((img, i) => {
                  if (!img) return null;

                  let className = "w-full flex justify-center";
                  if (i === 0) className += " sm:col-start-2";
                  if (i === 3) className += " sm:col-start-2";
                  if (i === 8) className += " sm:col-start-2";

                  return (
                    <div key={i} className={className}>
                      <Image
                        src={img}
                        alt={`${project.title} - middle ${i}`}
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="w-full h-auto object-contain"
                      />
                    </div>
                  );
                })}
            </div>
          )}

          {images.length > 5 && (
            <div className="space-y-10 pt-10 pb-10">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {images.slice(4, 7).map(
                  (img, i) =>
                    img && (
                      <div key={i} className="w-full flex justify-center">
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
            </div>
          )}

          {images.length > 1 && (
            <div className="w-full h-[400px] sm:min-h-[110vh] relative overflow-hidden mb-10">
              <Image
                src={images[images.length - 1]}
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
        description={project.description}
        details={project.details}
      />
    </div>
  );
}
