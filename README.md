# Project Documentation: Speech-to-Text ChatGPT Query with Dev.to Article Publishing

## Overview

This project is a web application that allows users to input queries via speech. The speech is converted to text, which is then sent to the OpenAI ChatGPT API. The API returns a response, which is displayed to the user on the website. If the user approves the response, it is published as an article on [dev.to](https://dev.to/). For future similar queries, the system provides the original response along with a link to the published article.

## Features

1. **Speech-to-Text Conversion:** Users can speak their queries into the microphone. The spoken query is converted to text using a speech recognition service.
2. **ChatGPT Query:** The text query is sent to the OpenAI ChatGPT API, which generates a response.
3. **Response Display:** The response from ChatGPT is displayed to the user on the website.
4. **Article Publishing:** Users can approve the response. Upon approval, the response is published as an article on dev.to.
5. **Handling Similar Queries:** If another user asks a similar query in the future, the system provides the original response along with a link to the published article instead of republishing the response.

## Workflow

1. **User Interaction:**
   - User clicks a button to start recording their query via the microphone.
   - The spoken query is converted to text and displayed on the screen.

2. **Processing the Query:**
   - The text query is sent to the OpenAI ChatGPT API.
   - The API processes the query and returns a response.

3. **Displaying the Response:**
   - The response is displayed to the user on the website.
   - The user is prompted to approve the response.

4. **Publishing the Article:**
   - If the user approves the response, it is published as an article on dev.to.
   - The article includes the query and the response.

5. **Handling Future Queries:**
   - The system stores the query and the link to the published article.
   - If a future user asks a similar query, the system provides the original response and a link to the article instead of sending a new query to ChatGPT.

