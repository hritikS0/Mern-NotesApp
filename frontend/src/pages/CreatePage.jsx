import axios from "axios";
import { ArrowLeftIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, Navigate, useNavigate } from "react-router";
import api from "../lib/axios.js";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);
    try {
      await api.post("/notes", {
        title,
        content,
      });
      toast.success("Note create successfully ");
      navigate("/");
    } catch (error) {
      console.log("Error creating note", error);
      if(error.response.status === 429){
        toast.error("Slow down! You are creating notes too fast",{
          duration:4000,
          icon:"💀"
        })
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 pt-10">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <div className="max-w-2xl mx-auto mb-6">
          <Link to="/" className="btn btn-ghost">
            <ArrowLeftIcon className="size-5" />
            Back to Notes
          </Link>
        </div>

        {/* Card */}
        <div className="max-w-2xl mx-auto">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body space-y-4">
              {/* Title */}
              <h2 className="card-title text-2xl">Create New Note</h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Title Input */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Title</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Note title..."
                    className="input input-bordered w-full"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                {/* Content Input */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Content</span>
                  </label>
                  <textarea
                    placeholder="Write your note..."
                    className="textarea textarea-bordered h-40 w-full"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>

                {/* Submit Button */}
                <div className="card-actions justify-end">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? "Creating..." : "Create Note"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
