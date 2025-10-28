import React from 'react'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import { addTopastes, updateTopaste } from "../Redux/PasteSlice";

const ViewPaste = () => {

  const {id} = useParams()
  const allPastes = useSelector((state)=> state.Paste.pastes);

  const paste = allPastes.filter((p)=> {
    return p._id === id;
  })[0]
  console.log("Final Paste : ", paste)
  
  return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-amber-50 via-orange-100 to-amber-200 px-4 py-10">
      <div className="w-full max-w-3xl bg-white shadow-2xl rounded-3xl p-8 transition-all duration-300 hover:shadow-[0_0_25px_rgba(251,191,36,0.6)]">

        {/* Title Input */}
        <div className="flex gap-3 items-center mb-6">
          <input
            className="flex-1 border border-amber-300 rounded-2xl bg-amber-50 focus:bg-white p-3 text-lg outline-none focus:ring-2 focus:ring-amber-400 transition-all duration-200"
            type="text"
            placeholder="Enter Title..."
            value={paste.title}
            onChange={(e) => setTitle(e.target.value)}
            disabled
          />
        </div>

        {/* Textarea */}
        <textarea
          className="w-full border border-amber-300 bg-amber-50 focus:bg-white rounded-2xl p-4 text-base resize-none focus:ring-2 focus:ring-amber-400 outline-none transition-all duration-200"
          placeholder="Write your content here..."
          value={paste.content}
          onChange={(e) => setValue(e.target.value)}
          rows={12}
          disabled
        />
      </div>
    </div>
  )
}

export default ViewPaste