/**
 * @Secondary_Account
 */

export const getHomeData = async () => {
  //   const HYGRAPH_ENDPOINT =
  //     "https://ap-south-1.cdn.hygraph.com/content/cm26zkygb0vh107o4hjji94sc/master";
  //   const HYGRAPH_TOKEN =
  //     "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE3Mjg3ODc4MTIsImF1ZCI6WyJodHRwczovL2FwaS1hcC1zb3V0aC0xLmh5Z3JhcGguY29tL3YyL2NtMjZ6a3lnYjB2aDEwN280aGpqaTk0c2MvbWFzdGVyIiwibWFuYWdlbWVudC1uZXh0LmdyYXBoY21zLmNvbSJdLCJpc3MiOiJodHRwczovL21hbmFnZW1lbnQtYXAtc291dGgtMS5oeWdyYXBoLmNvbS8iLCJzdWIiOiI0MDhlNTBmNy0xZjQwLTQ3NmItOWUxYi1mNTA2NjhjZTc1ODkiLCJqdGkiOiJjbTFlaGYzdzYwcmZuMDdwaWdwcmpieXhyIn0.ET2Dl1Dy18PHzv4hKY2LonVh5_EgfrPSAkRF6Ry-mSZ1godAvtalBii-JqlCHcQKeA1ls6mnaG4u4BLU3wL5LplMhI4uAQ-Th3T6AcOh1CEruKLkLVJFSy6sgRcUa0i2Rr4bJejM1Bv_BTyDBDqoEvplZ0RLb3z8avJcDrRUBe-M1Fhj6u9ZikaN1BiBcnz6bS7UvecyC4Wr69ttYL8PDE6y83NzC7-UjzijPsvjx8ZET7TORrz3UH5_9WI0-AlkhMYg-_uu4YGJDsOP24gwKTDDmrmVeK0t6EoyYHsDM_76lkgm0Bf1rEjknDJLQLoiiJjS3SKXO4s7be09J_fdJPNnDiQ6sCJHXAtOIMN813P9bHoG4k-UXsBu01dau6viEz3dd0p6Q75AUmOJRAx-SnrLaNimAnSMtYGbbkmcPHqrXlVdHZg16MF82iLbDhtABM9ImIOqsw41xPaIWSDuiOy9ZxXaTraqX0SLtjxzOz7KSYo5HH4fxkY5d2jQxhLOIw2mwjg2QDPqyDSuoBUxyHhUFstUO_xtDGOlw7krza9ofvhkF4QV9a04rO5v_Xd0jK6wYcEkmaMeaINYpi1zqbUlpPczIYeY702QHQJuK_xt6rbDL37RacAoHuxE89D6NtEKFBozD9pGQj6pUVqjqcXN_DB-mFu43vKAxwK-nxo";

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
    const res = await fetch(process.env.HYGRAPH_SECONDARY_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.HYGRAPH_SECONDARY_TOKEN}`,
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

/**
 * @returns the Card Object of Community Page
 * @Main_Account
 */
export const getPublishedPosts = async () => {
  const HYGRAPH_ENDPOINT =
    "https://ap-south-1.cdn.hygraph.com/content/cm1dom1hh03y107uwwxrutpmz/master";
  const HYGRAPH_TOKEN =
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE3MjcwNjQxNzcsImF1ZCI6WyJodHRwczovL2FwaS1hcC1zb3V0aC0xLmh5Z3JhcGguY29tL3YyL2NtMWRvbTFoaDAzeTEwN3V3d3hydXRwbXovbWFzdGVyIiwibWFuYWdlbWVudC1uZXh0LmdyYXBoY21zLmNvbSJdLCJpc3MiOiJodHRwczovL21hbmFnZW1lbnQtYXAtc291dGgtMS5oeWdyYXBoLmNvbS8iLCJzdWIiOiI2Yzg4NjI5YS1jMmU5LTQyYjctYmJjOC04OTI2YmJlN2YyNDkiLCJqdGkiOiJjbTFlaGYzdzYwcmZuMDdwaWdwcmpieXhyIn0.YMoI_XTrCZI-C7v_FX-oKL5VVtx95tPmOFReCdUcP50nIpE3tTjUtYdApDqSRPegOQai6wbyT0H8UbTTUYsZUnBbvaMd-Io3ru3dqT1WdIJMhSx6007fl_aD6gQcxb-gHxODfz5LmJdwZbdaaNnyKIPVQsOEb-uVHiDJP3Zag2Ec2opK-SkPKKWq-gfDv5JIZxwE_8x7kwhCrfQxCZyUHvIHrJb9VBPrCIq1XE-suyA03bGfh8_5PuCfKCAof7TbH1dtvaKjUuYY1Gd54uRgp8ELZTf13i073I9ZFRUU3PVjUKEOUoCdzNLksKc-mc-MF8tgLxSQ946AfwleAVkFCXduIAO7ASaWU3coX7CsXmZLGRT_a82wOORD8zihfJa4LG8bB-FKm2LVIu_QfqIHJKq-ytuycpeKMV_MTvsbsWeikH0tGPQxvAA902mMrYJr9wohOw0gru7mg_U6tLOwG2smcwuXBPnpty0oGuGwXWt_D6ryLwdNubLJpIWV0dOWF8N5D6VubNytNZlIbyFQKnGcPDw6hGRLMw2B7-1V2RpR6F3RibLFJf9GekI60UYdsXthAFE6Xzrlw03Gv5BOKImBoDPyMr0DCzneyAj9KDq4cbNNcihbHl1iA6lUCTNY3vkCBXmyujXZEcLu_Q0gvrAW3OvZMHeHY__CtXN6JFA";

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
    const res = await fetch(HYGRAPH_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${HYGRAPH_TOKEN}`,
      },
      body: JSON.stringify({ query }),
    });

    if (!res.ok) {
      throw new Error(`Error fetching data from Hygraph: ${res.statusText}`);
    }

    const jsonData = await res.json();

    // Log the entire response to inspect the structure
    console.log("Hygraph Response:", jsonData);

    // Extract blogs data from response
    const blogs = jsonData.data?.blogs || [];

    return blogs;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
};
