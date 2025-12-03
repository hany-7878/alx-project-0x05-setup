import ImageCard from "@/components/common/ImageCard";
import useFetchData from "@/hooks/useFetchData";
import { ImageProps } from "@/interfaces";
import React, { useEffect, useState } from "react";

const Home: React.FC = () => {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const { isLoading, responseData, generatedImages, fetchData } =
    useFetchData<any, { prompt: string }>();

  const handleGenerateImage = () => {
    if (!prompt.trim()) return;
    fetchData("/api/generate-image", { prompt });
  };

  useEffect(() => {
    if (!isLoading) {
      setImageUrl(responseData?.message);
    }
  }, [isLoading]);


  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col items-center px-4 py-10">

      {/* Hero Section */}
      <div className="text-center max-w-2xl mb-10">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
          AI Image Generator
        </h1>
        <p className="text-lg text-gray-600">
          Transform your ideas into stunning visuals instantly.
        </p>
      </div>

      {/* Prompt Input Card */}
      <div className="w-full max-w-xl bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-gray-200">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe the image you want..."
          className="w-full p-3 border border-gray-300 rounded-xl mb-4 focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <button
          onClick={handleGenerateImage}
          className="w-full py-3 rounded-xl font-medium bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          {isLoading ? "Generating..." : "Generate Image"}
        </button>
      </div>

      {/* Display Main Generated Image */}
      {responseData?.message && (
        <div className="mt-8">
          <ImageCard
            action={() => setImageUrl(imageUrl)}
            imageUrl={imageUrl}
            prompt={prompt}
          />
        </div>
      )}

      {/* Generated Images Gallery */}
      {generatedImages.length > 0 && (
        <div className="mt-12 w-full max-w-5xl">
          <h3 className="text-2xl font-semibold mb-4 text-center">
            Previously Generated Images
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 p-4 bg-white rounded-2xl shadow">
            {generatedImages.map(
              ({ imageUrl, prompt }: ImageProps, index) => (
                <ImageCard
                  key={index}
                  action={() => setImageUrl(imageUrl)}
                  imageUrl={imageUrl}
                  prompt={prompt}
                  width="w-full"
                  height="h-40"
                />
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
