// API interaction functionality
async function fetchExplanation(topic, category, subcategory, cacheKey) {
    const prompt = createPrompt(topic, category, subcategory);
    const apiUrl = `${CONFIG.API_URL}?key=${CONFIG.API_KEY}`;
    const payload = { contents: [{ role: "user", parts: [{ text: prompt }] }] };

    try {
        let response;
        let attempts = 0;
        let delay = CONFIG.INITIAL_DELAY;

        while (attempts < CONFIG.MAX_RETRIES) {
            response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (response.ok) break;
            if (response.status === 429 || response.status >= 500) {
                await new Promise(resolve => setTimeout(resolve, delay));
                delay *= 2;
                attempts++;
            } else {
                throw new Error(`API request failed with status ${response.status}`);
            }
        }
        if (!response.ok) throw new Error(`API request failed after retries.`);

        const result = await response.json();
        const markdownText = result.candidates?.[0]?.content?.parts?.[0]?.text;
        if (markdownText) {
            saveTopicToCache(cacheKey, markdownText);
            return markdownText;
        } else {
            throw new Error("Failed to get a valid response from the API.");
        }
    } catch (error) {
        console.error('Error fetching from Gemini API:', error);
        throw error;
    }
}
