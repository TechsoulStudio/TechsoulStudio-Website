import axios from "axios";

const apiURL = "https://techsoulstudio-back.onrender.com/api";

const apiClient = axios.create({
  baseURL: apiURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export interface LoginResponse {
  success: boolean;
  message: string;
  token?: string;
  expiresIn?: string;
  admin?: {
    id: string;
    email: string;
    role: string;
  };
}

// export interface Project {
//   _id: string;
//   title: string;
//   category: string;
//   // client: string;
//   year: string;
//   services: string[];
//   description: string[];
//   details: string[];
//   imageUrl?: string;
//   imageUrls?: string[];
//   createdAt?: string;
//   updatedAt?: string;
//   slug: string;
//   image?: string;
//   images?: string[];
//   webUrl : string;
// }

// export interface ProjectResponse {
//   success: boolean;
//   message: string;
//   project?: Project;
// }

// export interface ProjectFormData {
//   title: string;
//   category: string;
//   // client: string;
//   year: string;
//   services: string[];
//   description: string[];
//   details: string[];
//   image: File | null;
//   images: File[];
//   webUrl : string;
// }

export interface Project {
  _id: string;
  title: string;
  category: string;
  // client: string;
  year: string;
  services: string[];
  description: string[];
  details: string[];
  imageUrl?: string;
  imageUrls?: string[];
  createdAt?: string;
  updatedAt?: string;
  slug: string;
  image?: string;
  images?: string[];
  webUrl?: string;
}

export interface ProjectResponse {
  success: boolean;
  message: string;
  project?: Project;
}

export interface ProjectFormData {
  title: string;
  category: string;
  // client: string;
  year: string;
  services: string[];
  description: string[];
  details: string[];
  image: File | null;
  images: File[];
  webUrl : string;
}

export interface Inquiry {
  _id: string;
  name: string;
  business: string;
  email: string;
  contact: string;
  services: string[];
  date: string;
  createdAt: string;
}

export interface InquiryResponse {
  success: boolean;
  message: string;
  data: Inquiry[];
}

export interface ContactFormData {
  services: string[];
  name: string;
  business: string;
  email: string;
  referral?: string;
  contact: string;
  message?: string;
  newsletter?: boolean;
}

export interface Subscriber {
  _id: string;
  email: string;
  createdAt: string;
}

export interface TeamMember {
  _id: string;
  name: string;
  role: string;
  image: string;
}

export interface TeamResponse {
  success: boolean;
  message: string;
  member?: TeamMember;
}

export interface Post {
  _id: string;
  title: string;
  link: string;
  image: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface PostResponse {
  success: boolean;
  message: string;
  post?: Post;
}

export interface Review {
  _id?: string;
  name: string;
  role: string;
  quote: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ReviewResponse {
  success: boolean;
  message: string;
  review?: Review;
}

export const loginAdmin = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const response = await apiClient.post<LoginResponse>("/admin/signin", {
      email,
      password,
    });
    return response.data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      const serverMessage = (err.response?.data as { message?: string })
        ?.message;
      console.error("loginAdmin error", err.response?.data || err.message);
      return {
        success: false,
        message: serverMessage || "Login failed due to a server error.",
      };
    }
    console.error("loginAdmin unexpected error", err);
    return { success: false, message: "An unexpected error occurred." };
  }
};

export const addProject = async (
  projectData: ProjectFormData,
  token: string
): Promise<ProjectResponse> => {
  try {
    const form = new FormData();
    form.append("title", projectData.title);
    form.append("category", projectData.category);
    // form.append("client", projectData.client);
    form.append("year", projectData.year);
    form.append("services", JSON.stringify(projectData.services));
    form.append("description", JSON.stringify(projectData.description));
    form.append("details", JSON.stringify(projectData.details));
    if (projectData.image) form.append("image", projectData.image);
    projectData.images.forEach((img) => form.append("images", img));
    if (projectData.webUrl) form.append("webUrl", projectData.webUrl);

    const response = await axios.post<ProjectResponse>(
      `${apiURL}/project/add`,
      form,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      }
    );

    return {
      success: true,
      message: response.data.message || "Project created successfully",
      project: response.data.project,
    };
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      const serverMessage =
        (err.response?.data as { message?: string })?.message ||
        "Project creation failed";
      console.error("addProject error", err.response?.data || err.message);
      return { success: false, message: serverMessage };
    }
    console.error("addProject unexpected error", err);
    return {
      success: false,
      message: "An unexpected error occurred while creating the project.",
    };
  }
};

export const fetchProjects = async (): Promise<Project[]> => {
  try {
    const res = await apiClient.get<Project[]>("/project");
    return res.data;
  } catch (error) {
    console.error("fetchProjects error", error);
    throw error;
  }
};

export const fetchProjectById = async (
  id: string,
  token: string
): Promise<Project> => {
  try {
    const response = await axios.get(`${apiURL}/project/${id}`, {
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    });
    const projectData = response.data.project || response.data;
    if (!projectData || !projectData._id)
      throw new Error("Invalid project data received");
    return projectData;
  } catch (error) {
    console.error("fetchProjectById error", error);
    throw new Error(
      axios.isAxiosError(error)
        ? error.response?.data?.message || "Failed to fetch project"
        : "Unexpected error"
    );
  }
};

export const updateProject = async (
  id: string,
  projectData: ProjectFormData,
  token: string
): Promise<ProjectResponse> => {
  try {
    const form = new FormData();
    form.append("title", projectData.title);
    form.append("category", projectData.category);
    // form.append("client", projectData.client);
    form.append("year", projectData.year);
    form.append("services", JSON.stringify(projectData.services));
    form.append("description", JSON.stringify(projectData.description));
    form.append("details", JSON.stringify(projectData.details));
    if (projectData.image) form.append("image", projectData.image);
    projectData.images.forEach((img) => form.append("images", img));

    const response = await apiClient.put<ProjectResponse>(
      `/project/${id}`,
      form,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("updateProject error", error);
    throw error;
  }
};

export const deleteProject = async (
  id: string,
  token: string
): Promise<void> => {
  try {
    await apiClient.delete(`/project/${id}`, {
      headers: { Authorization: token },
    });
  } catch (error) {
    console.error("deleteProject error", error);
    throw error;
  }
};

export const fetchInquiriesService = async (): Promise<Inquiry[]> => {
  try {
    const res = await axios.get<InquiryResponse>(`${apiURL}/contact`);
    if (res.data.success) return res.data.data;
    throw new Error(res.data.message || "Failed to fetch inquiries");
  } catch (err: unknown) {
    console.error("fetchInquiriesService error:", err);
    throw err;
  }
};

export const deleteInquiryService = async (id: string): Promise<void> => {
  try {
    const res = await axios.delete<{ success: boolean; message?: string }>(
      `${apiURL}/contact/${id}`
    );
    if (!res.data.success)
      throw new Error(res.data.message || "Failed to delete inquiry");
  } catch (err: unknown) {
    console.error("deleteInquiryService error:", err);
    throw err;
  }
};

export const submitContactForm = async (data: ContactFormData) => {
  try {
    const response = await axios.post(`${apiURL}/contact`, data);
    return response.data;
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to submit form.";
    throw new Error(message);
  }
};

export const subscribeNewsletter = async (email: string) => {
  try {
    const response = await apiClient.post<{
      success: boolean;
      message: string;
    }>("/subscribe", { email });
    return response.data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      const serverMessage =
        (err.response?.data as { message?: string })?.message ||
        "Subscription failed";
      console.error(
        "subscribeNewsletter error",
        err.response?.data || err.message
      );
      return { success: false, message: serverMessage };
    }
    console.error("subscribeNewsletter unexpected error", err);
    return { success: false, message: "An unexpected error occurred." };
  }
};

export const fetchSubscribersService = async (): Promise<Subscriber[]> => {
  try {
    const response = await apiClient.get<Subscriber[]>("/subscriptions");
    return response.data;
  } catch (err: unknown) {
    console.error("fetchSubscribersService error:", err);
    throw err;
  }
};

export const fetchTeamMembers = async (): Promise<TeamMember[]> => {
  try {
    const res = await apiClient.get<TeamMember[]>("/team");
    return res.data;
  } catch (error) {
    console.error("fetchTeamMembers error", error);
    throw error;
  }
};

export const addTeamMember = async (
  formData: FormData,
  token: string
): Promise<TeamResponse> => {
  try {
    const res = await axios.post<TeamResponse>(`${apiURL}/team`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: token,
      },
    });
    return res.data;
  } catch (error) {
    console.error("addTeamMember error", error);
    throw error;
  }
};

export const updateTeamMember = async (
  id: string,
  formData: FormData,
  token: string
): Promise<TeamResponse> => {
  try {
    const res = await axios.put<TeamResponse>(
      `${apiURL}/team/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error("updateTeamMember error", error);
    throw error;
  }
};

export const deleteTeamMember = async (
  id: string,
  token: string
): Promise<void> => {
  try {
    await axios.delete(`${apiURL}/team/${id}`, {
      headers: { Authorization: token },
    });
  } catch (error) {
    console.error("deleteTeamMember error", error);
    throw error;
  }
};

export const fetchPosts = async (): Promise<Post[]> => {
  try {
    const res = await apiClient.get<Post[]>("/posts");
    return res.data;
  } catch (error) {
    console.error("fetchPosts error:", error);
    throw error;
  }
};

export const fetchPostById = async (
  id: string,
  token: string
): Promise<Post> => {
  try {
    const res = await apiClient.get<Post>(`/posts/${id}`, {
      headers: { Authorization: token },
    });
    return res.data;
  } catch (error) {
    console.error("fetchPostById error:", error);
    throw error;
  }
};

export const addPost = async (
  formData: FormData,
  token: string
): Promise<PostResponse> => {
  try {
    const res = await axios.post<PostResponse>(`${apiURL}/posts`, formData, {
      headers: { "Content-Type": "multipart/form-data", Authorization: token },
    });
    return res.data;
  } catch (error) {
    console.error("addPost error:", error);
    throw error;
  }
};

export const updatePost = async (
  id: string,
  formData: FormData,
  token: string
): Promise<PostResponse> => {
  try {
    const res = await axios.put<PostResponse>(
      `${apiURL}/posts/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error("updatePost error:", error);
    throw error;
  }
};

export const deletePost = async (id: string, token: string): Promise<void> => {
  try {
    await apiClient.delete(`${apiURL}/posts/${id}`, {
      headers: { Authorization: token },
    });
  } catch (error) {
    console.error("deletePost error:", error);
    throw error;
  }
};

export const fetchReviews = async (): Promise<Review[]> => {
  try {
    const res = await apiClient.get<{ success: boolean; reviews: Review[] }>(
      "/reviews"
    );
    return res.data.reviews;
  } catch (error) {
    console.error("fetchReviews error:", error);
    throw error;
  }
};

export const addReviewAPI = async (
  review: Review,
  token: string
): Promise<ReviewResponse> => {
  try {
    const res = await apiClient.post<ReviewResponse>("/reviews/add", review, {
      headers: { Authorization: token },
    });
    return res.data;
  } catch (error) {
    console.error("addReviewAPI error:", error);
    throw error;
  }
};

export const updateReviewAPI = async (
  id: string,
  review: Review,
  token: string
): Promise<ReviewResponse> => {
  try {
    const res = await apiClient.put<ReviewResponse>(
      `/reviews/update/${id}`,
      review,
      {
        headers: { Authorization: token },
      }
    );
    return res.data;
  } catch (error) {
    console.error("updateReviewAPI error:", error);
    throw error;
  }
};

export const deleteReviewAPI = async (
  id: string,
  token: string
): Promise<ReviewResponse> => {
  try {
    const res = await apiClient.delete<ReviewResponse>(
      `/reviews/delete/${id}`,
      {
        headers: { Authorization: token },
      }
    );
    return res.data;
  } catch (error) {
    console.error("deleteReviewAPI error:", error);
    throw error;
  }
};

export interface BlogFormData {
  title: string;
  topic: string;
  category: string;
  date: string;
  // discussionPoints: string[];
  content: string[];
  image: File | null;
  images: File[];
  // imageUrls: string[];
}

export interface Blog {
  _id: string;
  title: string;
  topic: string;
  category: string;
  date: string;
  // discussionPoints: string[];
  content: string[];
  imageUrl?: string;
  createdAt?: string;
  updatedAt?: string;
  slug: string;
  image?: string;
}

export interface BlogResponse {
  success: boolean;
  message: string;
  blog?: Blog;
}

export const addBlog = async (
  blogData: BlogFormData,
  token: string
): Promise<BlogResponse> => {
  try {
    const form = new FormData();
    form.append("title", blogData.title);
    form.append("topic", blogData.topic);
    form.append("category", blogData.category);
    form.append("date", blogData.date);
    // form.append("discussionPoints", JSON.stringify(blogData.discussionPoints));
    form.append("content", JSON.stringify(blogData.content));
    form.append("contents", JSON.stringify(blogData.content));
    if (blogData.image) form.append("image", blogData.image);
    blogData.images.forEach((img: File) =>
      form.append("images", img, img.name)
    );

    const response = await axios.post<BlogResponse>(
      `${apiURL}/blog/add`,
      form,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      }
    );

    return {
      success: true,
      message: response.data.message || "Blog created successfully",
      blog: response.data.blog,
    };
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      const serverMessage =
        (err.response?.data as { message?: string })?.message ||
        "Blog creation failed";
      console.error("addBlog error", err.response?.data || err.message);
      return { success: false, message: serverMessage };
    }
    console.error("addBlog unexpected error", err);
    return {
      success: false,
      message: "An unexpected error occurred while creating the blog.",
    };
  }
};

export const getAllBlogs = async (): Promise<Blog[]> => {
  try {
    const res = await apiClient.get<Blog[]>("/blog");
    return res.data;
  } catch (err) {
    console.error("getAllBlogs error:", err);
    throw err;
  }
};

export const deleteBlog = async (id: string, token: string): Promise<void> => {
  try {
    await apiClient.delete(`/blog/${id}`, {
      headers: { Authorization: token },
    });
  } catch (err) {
    console.error("deleteBlog error:", err);
    throw err;
  }
};

export const getBlogById = async (id: string, token: string) => {
  try {
    const res = await axios.get(`${apiURL}/blog/${id}`, {
      headers: { Authorization: `${token}` },
    });
    return { success: true, data: res.data };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        message: error.response?.data?.message || "Failed to fetch blog",
      };
    }
    return { success: false, message: "Failed to fetch blog" };
  }
};

export const updateBlog = async (id: string, formData: BlogFormData, token: string) => {
  try {
    const data = new FormData();

    data.append("title", formData.title);
    data.append("topic", formData.topic);
    data.append("category", formData.category);
    data.append("date", formData.date);

    // data.append("discussionPoints", JSON.stringify(formData.discussionPoints));
    data.append("content", JSON.stringify(formData.content));

    if (formData.image) {
      data.append("image", formData.image);
    }

    formData.images.forEach((img: File) => {
      data.append("images", img);
    });

    const res = await axios.put(`${apiURL}/blog/${id}`, data, {
      headers: {
        Authorization: `${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return {
      success: true,
      data: res.data,
      message: "Blog updated successfully",
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        message: error.response?.data?.message || "Failed to update blog",
      };
    }
    return { success: false, message: "Failed to update blog" };
  }
};
