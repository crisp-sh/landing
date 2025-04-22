export async function POST(request: Request) {
  const { email, firstName, lastName } = await request.json();

  if (!process.env.EMAILOCTOPUS_API_KEY || !process.env.LIST_ID) {
    console.error("EmailOctopus API Key or List ID not configured.");
    return new Response("Server configuration error", { status: 500 });
  }

  const fields: { [key: string]: string } = {};
  if (firstName) {
    fields.FirstName = firstName;
  }
  if (lastName) {
    fields.LastName = lastName;
  }

  try {
    const response = await fetch(
      `https://api.emailoctopus.com/lists/${process.env.LIST_ID}/contacts`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.EMAILOCTOPUS_API_KEY}`,
        },
        body: JSON.stringify({
          email_address: email,
          fields: fields,
          status: "subscribed",
        }),
      }
    );

    const responseData = await response.json();

    if (response.ok) {
      console.log("EmailOctopus Success:", responseData);
      return new Response(JSON.stringify(responseData), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
    console.error("EmailOctopus Error:", response.status, responseData);
    return new Response(JSON.stringify(responseData), {
      status: response.status,
      statusText: response.statusText,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Internal Server Error:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), { 
      status: 500, 
      headers: { "Content-Type": "application/json" },
    });
  }
}