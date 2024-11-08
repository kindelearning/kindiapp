import { GraphQLClient, gql } from "graphql-request";

const HYGRAPH_MAIN_ENDPOINT =
  "https://ap-south-1.cdn.hygraph.com/content/cm1dom1hh03y107uwwxrutpmz/master";
const HYGRAPH_MAIN_TOKEN =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE3MjcwNjQxNzcsImF1ZCI6WyJodHRwczovL2FwaS1hcC1zb3V0aC0xLmh5Z3JhcGguY29tL3YyL2NtMWRvbTFoaDAzeTEwN3V3d3hydXRwbXovbWFzdGVyIiwibWFuYWdlbWVudC1uZXh0LmdyYXBoY21zLmNvbSJdLCJpc3MiOiJodHRwczovL21hbmFnZW1lbnQtYXAtc291dGgtMS5oeWdyYXBoLmNvbS8iLCJzdWIiOiI2Yzg4NjI5YS1jMmU5LTQyYjctYmJjOC04OTI2YmJlN2YyNDkiLCJqdGkiOiJjbTFlaGYzdzYwcmZuMDdwaWdwcmpieXhyIn0.YMoI_XTrCZI-C7v_FX-oKL5VVtx95tPmOFReCdUcP50nIpE3tTjUtYdApDqSRPegOQai6wbyT0H8UbTTUYsZUnBbvaMd-Io3ru3dqT1WdIJMhSx6007fl_aD6gQcxb-gHxODfz5LmJdwZbdaaNnyKIPVQsOEb-uVHiDJP3Zag2Ec2opK-SkPKKWq-gfDv5JIZxwE_8x7kwhCrfQxCZyUHvIHrJb9VBPrCIq1XE-suyA03bGfh8_5PuCfKCAof7TbH1dtvaKjUuYY1Gd54uRgp8ELZTf13i073I9ZFRUU3PVjUKEOUoCdzNLksKc-mc-MF8tgLxSQ946AfwleAVkFCXduIAO7ASaWU3coX7CsXmZLGRT_a82wOORD8zihfJa4LG8bB-FKm2LVIu_QfqIHJKq-ytuycpeKMV_MTvsbsWeikH0tGPQxvAA902mMrYJr9wohOw0gru7mg_U6tLOwG2smcwuXBPnpty0oGuGwXWt_D6ryLwdNubLJpIWV0dOWF8N5D6VubNytNZlIbyFQKnGcPDw6hGRLMw2B7-1V2RpR6F3RibLFJf9GekI60UYdsXthAFE6Xzrlw03Gv5BOKImBoDPyMr0DCzneyAj9KDq4cbNNcihbHl1iA6lUCTNY3vkCBXmyujXZEcLu_Q0gvrAW3OvZMHeHY__CtXN6JFA";

const HYGRAPH_SECONDARY_ENDPOINT =
  "https://eu-west-2.cdn.hygraph.com/content/cm3861j030eio07ps0ruvea6s/master";
const HYGRAPH_SECONDARY_TOKEN =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE3MzEwMzU5MjUsImF1ZCI6WyJodHRwczovL2FwaS1ldS13ZXN0LTIuaHlncmFwaC5jb20vdjIvY20zODYxajAzMGVpbzA3cHMwcnV2ZWE2cy9tYXN0ZXIiLCJtYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC1ldS13ZXN0LTIuaHlncmFwaC5jb20vIiwic3ViIjoiODAxNzM3YzYtYmQ5ZS00YmYxLWI0MTItOTE0MTRlNWRlZTliIiwianRpIjoiY20xZWhmM3c2MHJmbjA3cGlncHJqYnl4ciJ9.E6uT0-D7nQFs6qGarUJIU_LYcRvoesEMg4IFKA8orEmJdMnY5m7CIYb1_j0nyZOnhx8d6nJlOGMQ0bPPwUpJIDZgfB-jZSotKflxFtlUs_ad3XCc8QkQMl8wGS6zjCOAgHdZmTryd6Vl_JqTLfzW4qYCnqfg5cO4cZ9Dba_KZ1GhsBteXTqnJSkH2nF8hfSdnLaVvMfYONCizHTfpimGKQgcita7Hgkv7h1_PXfCA1Oa9ViT6Ht4cJCyHvUqI7RSiTZb-Yk5yiqVNfaJa_fXOYkvmt-0ioSjloFm-BZTU4o2CfjaBI3nzCx_zRizwi5vos-C6O0fCm_xcDkBQd5qPGiR8JA1Oj1znq17pVT-ujNPrtgenCX4vIaKqPZHT1ANxyVtxw1ZdXYrXHKxF7lxoedemq-jHzaJYiahGaNYXzF8_PpIRjm5LKiM29eL7z1zGVZI5PMnVp0j-Bvr9wxgE_V8ScOqsRjUJd_TgFhgCj8ffjitcpvlUJZn-nuOPaHbG2Vg_AVFkiNce9rFEp_MFLR6DP6Irh14WO5VuyxuJZbjQBm8hanUSy4xrzDgIFpJFDs532o_XMHfMDyn3-VxXQ-yg3gpjid77dkQefANgqCN7xwd06nshymB5DoKoZnUqHCUZNJdtNek1DMg8IvplMwqsfpjB-lNPpHUxE93mYI";

export const hygraphClient = new GraphQLClient(HYGRAPH_MAIN_ENDPOINT, {
  headers: {
    authorization: `Bearer ${HYGRAPH_MAIN_TOKEN}`, // Add token if needed
  },
});
/**
 * @Home_data from @Secondary_Account
 */
export const getHomeData = async () => {
  const query = `
      query {
        homePages {
          id
          hero
          childDevelopmentUnlocked
          earlyLearningExperts
          howItWorks
          howItWorksOne
          hiwOne{
            url
          }
          hiwTwo{
            url
          }
          hiwThree{
            url
          }
          howItWorksTwo
          howItWorksThree
          popularLearningActivities
          monthlyTheme
          ourPricing
        }
      }
    `;

  try {
    const res = await fetch(HYGRAPH_SECONDARY_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${HYGRAPH_SECONDARY_TOKEN}`,
      },
      body: JSON.stringify({ query }),
    });

    if (!res.ok) {
      throw new Error(`Error fetching home data: ${res.statusText}`);
    }

    const jsonData = await res.json();
    return jsonData.data?.homePages || null; // Correctly accessing homePages here
  } catch (error) {
    console.error("Error fetching home data:", error);
    return null;
  }
};
export const getHIWData = async () => {
  const query = `
    query {
      howItWorks {
        id
        playForLife
        areasOfLearning
        skillsCategories
        ageRanges        
      }
    }
  `;
  try {
    const res = await fetch(HYGRAPH_SECONDARY_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${HYGRAPH_SECONDARY_TOKEN}`,
      },
      body: JSON.stringify({ query }),
    });

    if (!res.ok) {
      throw new Error(`Error fetching story data: ${res.statusText}`);
    }

    const jsonData = await res.json();
    return jsonData.data?.howItWorks || null; // Correctly accessing ourStories here
  } catch (error) {
    console.error("Error fetching story data:", error);
    return null;
  }
};
export const getStoryData = async () => {
  const query = `
    query {
      ourStories {
        id
        theKindiMission
        ourStory
        parentWithKindi
        aboutJanineHaenel
        aboutThomasDobinsom
      }
    }
  `;
  try {
    const res = await fetch(HYGRAPH_SECONDARY_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${HYGRAPH_SECONDARY_TOKEN}`,
      },
      body: JSON.stringify({ query }),
    });

    if (!res.ok) {
      throw new Error(`Error fetching story data: ${res.statusText}`);
    }

    const jsonData = await res.json();
    return jsonData.data?.ourStories || null; // Correctly accessing ourStories here
  } catch (error) {
    console.error("Error fetching story data:", error);
    return null;
  }
};

/**
 * @Blog_data from @Main_Account
 */
export const getPublishedPosts = async () => {
  const query = `
      query {
        blogs {
          id
          blogTitle
          metaDescription
          thumbnail {
            url
          }
          content {
            html  # Retrieve the HTML content
            markdown  # Retrieve as markdown
            raw  # Retrieve raw JSON
          }
          likeCount
        }
      }
    `;

  try {
    const res = await fetch(HYGRAPH_MAIN_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${HYGRAPH_MAIN_TOKEN}`,
      },
      body: JSON.stringify({ query }),
    });

    if (!res.ok) {
      throw new Error(`Error fetching data from Hygraph: ${res.statusText}`);
    }

    const jsonData = await res.json();

    // Log the entire response to inspect the structure

    // Extract blogs data from response
    const blogs = jsonData.data?.blogs || [];
    console.log("Hygraph Response:", jsonData);

    return blogs;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
};
export const likeBlogPost = async (id, currentLikeCount) => {
  const mutation = `
      mutation($id: ID!, $likeCount: Int!) {
        updateBlog(where: { id: $id }, data: { likeCount: $likeCount }) {
          id
          likeCount
        }
        publishBlog(where: { id: $id }) {
          id
        }
      }
    `;

  const variables = {
    id,
    likeCount: currentLikeCount + 1, // Increment the like count
  };

  const res = await fetch(process.env.HYGRAPH_MAIN_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.HYGRAPH_MAIN_TOKEN}`,
    },
    body: JSON.stringify({ query: mutation, variables }),
  });

  const json = await res.json();
  return json.data.updateBlog.likeCount;
};
export const getBlogById = async (id) => {
  const query = `
      query($id: ID!) {
        blog(where: { id: $id }) {
          id
          blogTitle
          metaDescription
          thumbnail {
            url
          }
          content {
            html
          }
          likeCount
          comments {
            ... on AddComment {
            id
            name
            content
            }
          }
        }
      }
    `;

  try {
    const res = await fetch(HYGRAPH_MAIN_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${HYGRAPH_MAIN_TOKEN}`,
      },
      body: JSON.stringify({
        query,
        variables: { id }, // Pass the blog id as variable
      }),
    });

    if (!res.ok) {
      throw new Error(`Error fetching blog by ID: ${res.statusText}`);
    }

    const jsonData = await res.json();
    const blog = jsonData.data?.blog;
    console.log("Blog Details : " + blog);
    return blog;
  } catch (error) {
    console.error("Error fetching blog by ID:", error);
    return null;
  }
};
export const getAllBlogIds = async () => {
  const query = `
      {
        blogs {
          id
        }
      }
    `;

  try {
    const res = await fetch(HYGRAPH_MAIN_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${HYGRAPH_MAIN_TOKEN}`,
      },
      body: JSON.stringify({ query }),
    });

    if (!res.ok) {
      throw new Error(`Error fetching all blog IDs: ${res.statusText}`);
    }

    const jsonData = await res.json();
    const ids = jsonData.data.blogs.map((blog) => blog.id); // Extract IDs
    return ids;
  } catch (error) {
    console.error("Error fetching all blog IDs:", error);
    return [];
  }
};

/**
 * @Profile_data from @Main_account
 */
export const fetchProfilePictures = async () => {
  const query = `
      query {
        profilePictureAccount {
          id
          url
        }
      }
    `;

  try {
    const res = await fetch(HYGRAPH_MAIN_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${HYGRAPH_MAIN_TOKEN}`,
      },
      body: JSON.stringify({ query }),
    });

    if (!res.ok) {
      throw new Error(`Error fetching profile pictures: ${res.statusText}`);
    }

    const jsonData = await res.json();
    return jsonData.data?.profilePictureAccount || [];
  } catch (error) {
    console.error("Error fetching profile pictures:", error);
    return [];
  }
};

/**
 * @Acitivity_Data from @Main_Account
 */
export const getAllActivities = async () => {
  const query = `
    query {
      activities {
        id
        title
        skills
        keywords
        content {
          html
          markdown
          raw
        }
        activityDate
        thumbnail {
          url
        }
        activityImages {
          url
        }
        setUpTime
        themeName
        focusAge
        eventTimeline
        
      }
    }
  `;

  try {
    const res = await fetch(HYGRAPH_MAIN_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${HYGRAPH_MAIN_TOKEN}`,
      },
      body: JSON.stringify({ query }),
    });

    // Check if the request was successful
    if (!res.ok) {
      throw new Error(`Error fetching data from Hygraph: ${res.statusText}`);
    }

    const jsonData = await res.json();

    // Log the response data for debugging
    console.log("Fetched Activities:", jsonData);

    // Check if there are any errors in the response
    if (jsonData.errors) {
      console.error("GraphQL Errors:", jsonData.errors);
      throw new Error("Failed to fetch activities due to GraphQL errors.");
    }

    // Return the activities data or an empty array if not available
    return jsonData.data?.activities || [];
  } catch (error) {
    console.error("Error fetching activities:", error);
    return [];
  }
};
export const getRandomActivities = async () => {
  const query = `
    query {
      activities {
        id
        title
        skills
        keywords
        content {
          html
          markdown
          raw
        }
        activityDate
        thumbnail {
          url
        }
        activityImages {
          url
        }
        setUpTime
        themeName
        focusAge
        eventTimeline
        
      }
    }
  `;

  try {
    const res = await fetch(HYGRAPH_MAIN_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${HYGRAPH_MAIN_TOKEN}`,
      },
      body: JSON.stringify({ query }),
    });

    // Check if the request was successful
    if (!res.ok) {
      throw new Error(`Error fetching data from Hygraph: ${res.statusText}`);
    }

    const jsonData = await res.json();

    // Log the response data for debugging
    console.log("Fetched Activities:", jsonData);

    // Check if there are any errors in the response
    if (jsonData.errors) {
      console.error("GraphQL Errors:", jsonData.errors);
      throw new Error("Failed to fetch activities due to GraphQL errors.");
    }

    // Return the activities data or an empty array if not available
    return jsonData.data?.activities || [];
  } catch (error) {
    console.error("Error fetching activities:", error);
    return [];
  }
};
export const getActivityById = async (id) => {
  const query = `
    query getActivityById($id: ID!) {
      activity(where: { id: $id }) {
        id
        title
        skills
        activityDate
        content {
          html
          markdown
          raw
        }
        thumbnail {
          url
        }
        activityImages {
          url
        }
        setUpTime
        themeName
        focusAge
        eventTimeline
        accordionOne
        bodyOne
        accordionTwo
        bodyTwo
        accordionThree
        bodyThree
        accordionFour
        bodyFour
        accordionFive
        bodyFive
        speechLanguage
        emotionalSocialStrength
        confidenceIndependence
        physicalAgility
        readingWriting
        discoveringOurWorld
        creativityImagination
        experimentsMath
      }
    }
  `;

  try {
    const res = await fetch(HYGRAPH_MAIN_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${HYGRAPH_MAIN_TOKEN}`,
      },
      body: JSON.stringify({ query, variables: { id } }),
    });

    if (!res.ok) {
      throw new Error(`Error fetching activity: ${res.statusText}`);
    }

    const jsonData = await res.json();
    return jsonData.data?.activity || null;
  } catch (error) {
    console.error("Error fetching activity:", error);
    return null;
  }
};
export const getAllActivityIds = async () => {
  const query = `
      {
        activities {
          id
        }
      }
    `;

  try {
    const res = await fetch(HYGRAPH_MAIN_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${HYGRAPH_MAIN_TOKEN}`,
      },
      body: JSON.stringify({ query }),
    });

    if (!res.ok) {
      throw new Error(`Error fetching all activity IDs: ${res.statusText}`);
    }

    const jsonData = await res.json();
    const ids = jsonData.data.activities.map((activity) => activity.id); // Extract IDs correctly
    return ids;
  } catch (error) {
    console.error("Error fetching all activity IDs:", error);
    return [];
  }
};

/**
 * @Theme_data from @Main_account
 */
export const getThemes = async () => {
  const query = `
    query {
      themes {
        id
        title
        metaDesc
        thumbnail {
          url
        }
        aboutContent {
          html  # Retrieve the HTML content
          markdown  # Retrieve as markdown
          raw  # Retrieve raw JSON
        }
        expectContent {
          html  # Retrieve the HTML content
          markdown  # Retrieve as markdown
          raw  # Retrieve raw JSON
        }
        launchTime
      }
    }
  `;

  try {
    const res = await fetch(HYGRAPH_MAIN_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${HYGRAPH_MAIN_TOKEN}`,
      },
      body: JSON.stringify({ query }),
    });

    if (!res.ok) {
      throw new Error(`Error fetching data from Hygraph: ${res.statusText}`);
    }

    const jsonData = await res.json();
    console.log("Hygraph Response for themes:", jsonData);

    // Extract themes data from response
    const themes = jsonData.data?.themes || [];
    console.log("Themes data:", themes); // Log themes data specifically

    return themes;
  } catch (error) {
    console.error("Error fetching themes:", error);
    return [];
  }
};
export const getThemeById = async (id) => {
  const query = `
    query getThemeById($id: ID!) {
      theme(where: { id: $id }) {
        id
        title
        metaDesc
        thumbnail {
          url
        }
        aboutContent {
          html
          markdown
          raw
        }
        expectContent {
          html
          markdown
          raw
        }
      }
    }
  `;

  try {
    const res = await fetch(HYGRAPH_MAIN_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${HYGRAPH_MAIN_TOKEN}`,
      },
      body: JSON.stringify({ query, variables: { id } }),
    });

    if (!res.ok) {
      throw new Error(`Error fetching theme data: ${res.statusText}`);
    }

    const jsonData = await res.json();
    return jsonData.data?.theme || null;
  } catch (error) {
    console.error("Error fetching theme by ID:", error);
    return null;
  }
};
export const getAllThemeIds = async () => {
  const query = `
      {
        themes {
          id
        }
      }
    `;

  try {
    const res = await fetch(HYGRAPH_MAIN_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${HYGRAPH_MAIN_TOKEN}`,
      },
      body: JSON.stringify({ query }),
    });

    if (!res.ok) {
      throw new Error(`Error fetching all theme IDs: ${res.statusText}`);
    }

    const jsonData = await res.json();
    const ids = jsonData.data.themes.map((theme) => theme.id); // Extract IDs from "themes"
    return ids;
  } catch (error) {
    console.error("Error fetching all theme IDs:", error);
    return [];
  }
};

/**
 * @Product_Data from @Main_account
 */

export const getProducts = async () => {
  const query = `
    query {
      products {
        id
        title
        keywords
        description {
          html  # Fetching HTML content of the description
          markdown
          raw
        }
        salePrice
        actualPrice
        thumbnail {
          url
        }
      }
    }
  `;

  try {
    const res = await fetch(HYGRAPH_MAIN_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${HYGRAPH_MAIN_TOKEN}`,
      },
      body: JSON.stringify({ query }),
    });

    if (!res.ok) {
      console.error("Response status:", res.status);
      console.error("Response error:", jsonData.errors);
      throw new Error(`Error fetching data from Hygraph: ${res.statusText}`);
    }

    const jsonData = await res.json();
    console.log("Fetched Shop Product:", jsonData);
    return jsonData.data?.products || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};
export const getProductById = async (id) => {
  const query = `
    query {
      product(where: { id: "${id}" }) {
        id
        title
        description {
          html  
          markdown
          raw
        }
        salePrice
        actualPrice
        thumbnail {
          url
        }
        productImages {
          url
        }
      }
    }
  `;

  try {
    const res = await fetch(HYGRAPH_MAIN_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${HYGRAPH_MAIN_TOKEN}`,
      },
      body: JSON.stringify({ query }),
    });

    const jsonData = await res.json();

    if (!res.ok) {
      console.error("Response status:", res.status);
      console.error("Response error:", jsonData.errors);
      throw new Error(`Error fetching data from Hygraph: ${res.statusText}`);
    }

    return jsonData.data?.product || null;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};
export const getAllProductIds = async () => {
  const query = `
      {
        products {
          id
        }
      }
    `;

  try {
    const res = await fetch(HYGRAPH_MAIN_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${HYGRAPH_MAIN_TOKEN}`,
      },
      body: JSON.stringify({ query }),
    });

    if (!res.ok) {
      throw new Error(`Error fetching all product IDs: ${res.statusText}`);
    }

    const jsonData = await res.json();
    const ids = jsonData.data.products.map((product) => product.id); // Corrected to `products`
    return ids;
  } catch (error) {
    console.error("Error fetching all product IDs:", error);
    return [];
  }
};

/**
 * @ProfileData from @mainAccount
 */
export const getUserDataByEmail = async (email) => {
  const query = `
    query GetUserByEmail($email: String!) {
      account(where: { email: $email }) {
        id
        name
        username
        email
        profilePicture {
          url
        }
        isVerified
        dateOfBirth
        attendingNursery
         partner {
            id
            email
            username
             profilePicture {
                url
              }
            dateOfBirth
          }
        
      }
    }
  `;
  const variables = { email };

  try {
    const data = await hygraphClient.request(query, variables);
    return data.account;
  } catch (error) {
    console.error("Error fetching user data from Hygraph:", error);
    return null;
  }
};
export const getHygraphPartners = async (userId) => {
  const FETCH_PARTNERS_QUERY = `
    query ($where: AccountWhereUniqueInput!) {
      account(where: $where) {
        id
        partner {
          id
          email
          username
          profilePicture {
            url
          }
          dateOfBirth
        }
      }
    }
  `;
  try {
    const data = await hygraphClient.request(FETCH_PARTNERS_QUERY, {
      where: { id: userId },
    });
    return data.account.partner || [];
  } catch (error) {
    console.error("Error fetching partners:", error);
    return [];
  }
};
export const getPublishedMileStone = async () => {
  const query = `
     query {
      milestones {
        id
        title
        description
        thumbnail {
          url
        }
      }
    }
  `;

  try {
    const res = await fetch(HYGRAPH_MAIN_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${HYGRAPH_MAIN_TOKEN}`,
      },
      body: JSON.stringify({ query }),
    });

    if (!res.ok) {
      throw new Error(`Error fetching data from Hygraph: ${res.statusText}`);
    }

    const jsonData = await res.json();
    console.log(
      "Full response from Hygraph:",
      JSON.stringify(jsonData, null, 2)
    );

    // Log the entire response to inspect the structure
    console.log("Hygraph Response of MileStone:", jsonData);

    // Extract blogs data from response
    const milestones = jsonData.data?.milestones || []; // Use optional chaining
    console.log("Extracted MileStone data:", milestones);

    return milestones;
  } catch (error) {
    console.error("Error fetching MileStone:", error);
    return [];
  }
};
export const getPublishedBadge = async () => {
  const query = `
     query {
      badges {
        id
        name
        description
        icon {
          url
        }
      }
    }
  `;

  try {
    const res = await fetch(HYGRAPH_MAIN_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${HYGRAPH_MAIN_TOKEN}`,
      },
      body: JSON.stringify({ query }),
    });

    if (!res.ok) {
      throw new Error(`Error fetching data from Hygraph: ${res.statusText}`);
    }

    const jsonData = await res.json();
    console.log(
      "Full response from Hygraph:",
      JSON.stringify(jsonData, null, 2)
    );

    // Log the entire response to inspect the structure
    console.log("Hygraph Response of Badge:", jsonData);

    // Extract blogs data from response
    const badges = jsonData.data?.badges || [];
    console.log("Extracted badges data:", badges);

    return badges;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
};

/**
 * @Standard_pages from @secondary_account
 */
export const getStandardPagesContent = async () => {
  const query = `
    query {
      standardPages {
        id
        featuredVideo {  
          url 
        }
        preloaderVideo {  
          url 
        }
        openingVideo {  
          url 
        }
        updatedAt
        qualityControl {
          html  # Retrieve the HTML content
        }
        investing {
          html  # Retrieve the HTML content
        }
        termsConditions {
          html  # Retrieve the HTML content
        }
        privacyPolicy {
          html  # Retrieve the HTML content
        }
        refundPolicy {
          html  # Retrieve the HTML content
        }
       
      }
    }
  `;
  // console.log("Fetching standard pages with query:", JSON.stringify({ query }));

  try {
    const res = await fetch(HYGRAPH_SECONDARY_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${HYGRAPH_SECONDARY_TOKEN}`,
      },
      body: JSON.stringify({ query }),
    });

    if (!res.ok) {
      console.error("Error fetching from Hygraph:", res.status, res.statusText);
      const errorResponse = await res.json();
      console.error("Response body:", errorResponse);
      return null;
    }

    const jsonData = await res.json();
    if (jsonData.errors) {
      console.error("GraphQL errors:", jsonData.errors);
      return null;
    }

    // console.log("Fetched data:", jsonData);
    return jsonData.data?.standardPages[0] || null;
  } catch (error) {
    console.error("Error fetching standard pages:", error);
    return null;
  }
};
