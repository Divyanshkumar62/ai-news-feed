// Database connection and operations (Supabase)
import { createClient } from "@supabase/supabase-js";
import * as dotenv from 'dotenv';
dotenv.config();

// Supabase credentials from environment variables
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Initialize Supabase client
const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    {
        auth: {
            persistSession: false,
        },
    }
);

const insertArticle = async (article) => {
    try {
        // Check if an article with the same link already exists
        const {data: existingArticle, error: selectError} = await supabase
            .from("articles")
            .select("*")
            .eq("link", article.link)
            .limit(1); // Limit to 1 result for efficiency

        if (selectError) {
            console.error("Error checking for existing article:", selectError);
            throw selectError;
        }

        if (existingArticle && existingArticle.length > 0) {
            console.log("Article already exists: skipping insertion");
            return null;
        }

        // Insert the article if it doesn't exist
        const {data, error} = await supabase
            .from("articles")
            .insert([article])
            .select();

        if (error) {
            console.error("Could not insert article", error);
            throw error;
        }
        console.log("Article inserted successfully");
        return data;
    } catch (error) {
        console.error("Error inserting article:", error.message);
        throw error;
    }
};

const getArticle = async (id) => {
    try {
        const {data, error} = await supabase
            .from("articles")
            .select("*")
            .eq("id", id)
            .single();

        if (error) {
            console.error("Could not get article", error);
            throw error;
        }
        return data;
    } catch (error) {
        console.error("Error getting article:", error.message);
        throw error;
    }
};

const updateArticle = async (id, article) => {
    try {
        const {data, error} = await supabase
            .from("articles")
            .update(article)
            .eq("id", id)
            .select();

        if (error) {
            console.error("Could not update article", error);
            throw error;
        }
        console.log("Article updated successfully");
        return data;
    } catch (error) {
        console.error("Error updating article:", error.message);
        throw error;
    }
};

const deleteArticle = async (id) => {
    try {
        const {data, error} = await supabase
            .from("articles")
            .delete()
            .eq("id", id)
            .select();

        if (error) {
            console.error("Could not delete article", error);
            throw error;
        }
        console.log("Article deleted successfully");
        return data;
    } catch (error) {
        console.error("Error deleting article:", error.message);
        throw error;
    }
};

const clearDatabase = async () => {
    // Implement the logic to clear all data from the table
    try {
        const {data, error} = await supabase
            .from("articles")
            .delete()
            .neq("id", 0)
            .select(); // Delete all rows

        if (error) {
            console.error("Could not clear database", error);
            throw error;
        }
        console.log("Database cleared successfully");
        return data;
    } catch (error) {
        console.error("Error clearing database:", error.message);
        throw error;
    }
};

const getAllArticles = async () => {
    try {
        const {data, error} = await supabase
            .from("articles")
            .select("*")
            .order("date", {ascending: false});

        if (error) {
            console.error("Could not get all articles", error);
            throw error;
        }
        return data;
    } catch (error) {
        console.error("Error getting all articles:", error.message);
        throw error;
    }
};

const getArticleByLink = async (link) => {
    try {
        const { data, error } = await supabase
            .from("articles")
            .select("*")
            .eq("link", link)
            .single();

        if (error) {
            // If no article is found, the error will be a 404, which is fine.
            if (error.code === 'PGRST116') {
                return null; // Article not found
            }
            console.error("Error getting article by link:", error);
            throw error;
        }
        return data;
    } catch (error) {
        console.error("Error getting article by link:", error.message);
        throw error;
    }
};

const incrementViewCount = async (id) => {
    try {
        // First, retrieve the current view count
        const {data: articleData, error: articleError} = await supabase
            .from("articles")
            .select("views")
            .eq("id", id)
            .single();

        if (articleError) {
            console.error("Could not get article views", articleError);
            throw articleError;
        }

        if (!articleData) {
            console.error("Article not found");
            throw new Error("Article not found");
        }

        const currentViews = articleData.views || 0;

        // Then, increment the view count and update the record
        const {data, error} = await supabase
            .from("articles")
            .update({views: currentViews + 1})
            .eq("id", id)
            .select();

        if (error) {
            console.error("Could not increment view count", error);
            throw error;
        }

        console.log("View count incremented successfully");
        return data;
    } catch (error) {
        console.error("Error incrementing view count:", error.message);
        throw error;
    }
};

const incrementShareCount = async (id) => {
    try {
        // First, retrieve the current share count
        const {data: articleData, error: articleError} = await supabase
            .from("articles")
            .select("shares")
            .eq("id", id)
            .single();

        if (articleError) {
            console.error("Could not get article shares", articleError);
            throw articleError;
        }

        if (!articleData) {
            console.error("Article not found");
            throw new Error("Article not found");
        }

        const currentShares = articleData.shares || 0;

        // Then, increment the share count and update the record
        const {data, error} = await supabase
            .from("articles")
            .update({shares: currentShares + 1})
            .eq("id", id)
            .select();

        if (error) {
            console.error("Could not increment share count", error);
            throw error;
        }

        console.log("Share count incremented successfully");
        return data;
    } catch (error) {
        console.error("Error incrementing share count:", error.message);
        throw error;
    }
};

const updatePopularity = async (id) => {
    try {
        // Retrieve views and shares
        const {data: articleData, error: articleError} = await supabase
            .from("articles")
            .select("views, shares")
            .eq("id", id)
            .single();

        if (articleError) {
            console.error("Could not get article views", articleError);
            throw articleError;
        }

        if (!articleData) {
            console.error("Article not found");
            throw new Error("Article not found");
        }

        const {views, shares} = articleData;
        const popularity = views + shares * 2;

        // Update the popularity
        const {data, error} = await supabase
            .from("articles")
            .update({popularity: popularity})
            .eq("id", id)
            .select();

        if (error) {
            console.error("Could not update popularity", error);
            throw error;
        }

        console.log("Popularity updated successfully");
        return data;
    } catch (error) {
        console.error("Error updating popularity:", error.message);
        throw error;
    }
};

const databaseService = {
    supabase,
    insertArticle,
    getArticle,
    updateArticle,
    deleteArticle,
    clearDatabase,
    getAllArticles,
    getArticleByLink,
    incrementViewCount,
    incrementShareCount,
    updatePopularity,
};

export default databaseService;
