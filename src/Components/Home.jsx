import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addTopastes, updateTopaste } from "../Redux/PasteSlice";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();
  const allPaste = useSelector((state)=> state.Paste.pastes);

  function createPaste() {
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      dispatch(updateTopaste(paste));
    } else {
      dispatch(addTopastes(paste));
    }

    setTitle("");
    setValue("");
    setSearchParams({});
  }

  useEffect(()=>{
    if(pasteId && allPaste.length > 0){
      const paste = allPaste.find((p)=>{
        return p._id === pasteId
      })
      setTitle(paste.title)
    setValue(paste.content)
    }
  },[pasteId])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-amber-50 via-orange-100 to-amber-200 px-4 py-10">
      <div className="w-full max-w-3xl bg-white shadow-2xl rounded-3xl p-8 transition-all duration-300 hover:shadow-[0_0_25px_rgba(251,191,36,0.6)]">
        <h1 className="text-3xl font-extrabold text-amber-600 mb-6 text-center tracking-wide">
          {pasteId ? "Update Your Paste" : "Create a New Paste"}
        </h1>

        {/* Title Input */}
        <div className="flex gap-3 items-center mb-6">
          <input
            className="flex-1 border border-amber-300 rounded-2xl bg-amber-50 focus:bg-white p-3 text-lg outline-none focus:ring-2 focus:ring-amber-400 transition-all duration-200"
            type="text"
            placeholder="Enter Title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            onClick={createPaste}
            className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-6 rounded-2xl transition-all duration-200 shadow-md hover:shadow-lg"
          >
            {pasteId ? "Update" : "Create"}
          </button>
        </div>

        {/* Textarea */}
        <textarea
          className="w-full border border-amber-300 bg-amber-50 focus:bg-white rounded-2xl p-4 text-base resize-none focus:ring-2 focus:ring-amber-400 outline-none transition-all duration-200"
          placeholder="Write your content here..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          rows={12}
        />

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-amber-700 italic">
          {pasteId
            ? "Editing an existing paste..."
            : "Your ideas are safe here 💭"}
        </div>
      </div>
    </div>
  );
};

export default Home;
