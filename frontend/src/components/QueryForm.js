import React, { useState, useEffect } from "react";
import { FaMicrophone, FaPaperPlane } from "react-icons/fa";
import ResponseDisplay from "./ResponseDisplay";
import LikeResponse from "./LikeResponse";
import LoadingSpinner from "./LoadingSpinner";
import { fetchResponse, publishResponse } from "../utils/api";
import "../styles/QueryForm.css";

const QueryForm = () => {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [link, setLink] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [liked, setLiked] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishSuccess, setPublishSuccess] = useState(false);

  const handleSpeechRecognition = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser does not support speech recognition.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setQuery(transcript);
    };

    recognition.start();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponse("");
    setLink(null);
    setLiked(null);
    setIsLoading(true);
    setPublishSuccess(false);

    try {
      const result = await fetchResponse(query);
      setResponse(result.data.response);
      setLink(result.data.link);
    } catch (error) {
      console.error("Error fetching response", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLikeChange = (e) => {
    setLiked(e.target.value);
  };

  const handlePublish = async () => {
    if (response && liked === "yes") {
      setIsPublishing(true);
      try {
        const result = await publishResponse(query, response);
        setLink(result.data.link);
        setPublishSuccess(true);
      } catch (error) {
        console.error("Error publishing response", error);
      } finally {
        setIsPublishing(false);
      }
    }
  };

  useEffect(() => {
    if (liked === "yes") {
      handlePublish();
    }
  }, [liked]);

  return (
    <div className={`query-form-container ${response ? "top" : ""}`}>
      <div className="chatbot-header">
        <div>
          <h1>SmartChat</h1>
          <p>Your AI-powered assistant</p>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="button-group">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter your query"
          />
          <button type="submit">
            <FaPaperPlane />
          </button>
          <button type="button" onClick={handleSpeechRecognition}>
            <FaMicrophone />
          </button>
        </div>
      </form>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <ResponseDisplay response={response} link={link} liked={liked} />
      )}
      {response && !link && !isLoading && (
        <>
          {liked === null && (
            <LikeResponse liked={liked} onLikeChange={handleLikeChange} />
          )}
          {liked === "no" && (
            <div className="not-published-message">
              This will not be published.
            </div>
          )}
        </>
      )}
      {isPublishing && <LoadingSpinner />}
      {publishSuccess && (
        <div className="publish-success-message">
          <p>
            Published successfully! View it{" "}
            <a href={link} target="_blank" rel="noopener noreferrer">
              here
            </a>
            .
          </p>
        </div>
      )}
    </div>
  );
};

export default QueryForm;
