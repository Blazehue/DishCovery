import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('query') || '';
  const cuisine = searchParams.get('cuisine') || '';
  const diet = searchParams.get('diet') || '';
  const type = searchParams.get('type') || '';
  const maxReadyTime = searchParams.get('maxReadyTime') || '';
  
  const apiKey = process.env.SPOONACULAR_API_KEY;
  
  if (!apiKey) {
    return NextResponse.json(
      { error: 'API key not configured' },
      { status: 500 }
    );
  }

  try {
    const params = new URLSearchParams({
      apiKey,
      query,
      number: '12',
      addRecipeInformation: 'true',
      fillIngredients: 'true',
      ...(cuisine && { cuisine }),
      ...(diet && { diet }),
      ...(type && { type }),
      ...(maxReadyTime && { maxReadyTime }),
    });

    const response = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?${params.toString()}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch recipes');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Recipe search error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch recipes' },
      { status: 500 }
    );
  }
}
