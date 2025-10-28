import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFrompastes } from '../Redux/PasteSlice'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

const Paste = () => {

  const pastes = useSelector((state) => state.Paste.pastes)
  console.log(pastes)

  const dispatch = useDispatch()
  const [searchTerm, setSearchTerm] = useState("")

  const filterData = pastes.filter((paste) => {
    return paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  })

  function handleDelete(pasteId) {
    dispatch(removeFrompastes(pasteId))
  }

  function handleShare(paste) {
    const shareText = `Title: ${paste.title}\n\nContent: ${paste.content}`;

  // Check if Web Share API is available
  if (navigator.share) {
    navigator.share({
      title: paste.title,
      text: paste.content,
    })
      .then(() => toast.success("Shared successfully!"))
      .catch((err) => toast.error("Sharing failed!"));
  } else {
    // Fallback: copy to clipboard
    navigator.clipboard.writeText(shareText)
      .then(() => toast.success("Copied to clipboard!"))
      .catch(() => toast.error("Failed to copy!"));
  }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 flex flex-col items-center py-10 px-5">
      {/* Search Bar */}
      <input
        className="p-3 rounded-2xl bg-white border border-amber-300 shadow-md w-full max-w-lg mb-8 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all"
        type="search"
        placeholder="🔍 Search your paste..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Paste List */}
      <div className="w-full max-w-3xl flex flex-col gap-5">
        {
          filterData.length > 0 &&
          filterData.map((paste) => {
            return (
              <div className="bg-white border border-amber-200 shadow-lg hover:shadow-amber-200 transition-all duration-300 p-6 rounded-3xl">
                <div className="font-extrabold text-amber-700 text-xl mb-2">
                  {paste.title}
                </div>
                <div className="text-gray-700 mb-4 whitespace-pre-wrap">
                  {paste.content}
                </div>

                {/* Buttons */}
                <div className="flex flex-wrap gap-3 mt-3">
                  <button className="bg-amber-500 text-white py-1 px-4 rounded-xl hover:bg-amber-600 transition-all cursor-pointer"><Link to={`/?pasteId=${paste?._id}`}>Edit</Link></button>
                  <button className="bg-amber-400 text-white py-1 px-4 rounded-xl hover:bg-amber-500 transition-all cursor-pointer"><Link to={`/pastes/${paste?._id}`}>View</Link></button>
                  <button
                    className="bg-red-500 text-white py-1 px-4 rounded-xl hover:bg-red-600 transition-all cursor-pointer"
                    onClick={() => handleDelete(paste?._id)}
                  >
                    Delete
                  </button>
                  <button className="bg-blue-500 text-white py-1 px-4 rounded-xl hover:bg-blue-600 transition-all cursor-pointer" onClick={() => handleShare(paste)}>
                    Share
                  </button>
                </div>

                <div className="text-xs text-gray-500 mt-3 italic">
                  Created: {new Date(paste.createdAt).toLocaleString()}
                </div>
              </div>
            )
          })
        }

        {filterData.length === 0 && (
          <div className="text-gray-500 text-center mt-10 text-lg">
            😕 No pastes found.
          </div>
        )}
      </div>
    </div>
  )
}

export default Paste
