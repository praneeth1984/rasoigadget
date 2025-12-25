// Get product price from settings or default to 499
export async function getProductPrice(): Promise<number> {
  try {
    const response = await fetch('/api/settings');
    const data = await response.json();
    
    if (data.success && data.settings.productPrice) {
      return parseInt(data.settings.productPrice);
    }
  } catch (error) {
    console.error('Error fetching product price:', error);
  }
  
  return 499; // Default price
}
