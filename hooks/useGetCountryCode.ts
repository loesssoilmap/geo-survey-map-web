export const useGetCountryCode = async (
	lat: number,
	lng: number
): Promise<{
	countryCode: null
	placeName: null
} | null> => {
	try {
		const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=10`)
		const data = await response.json()

		return {
			countryCode: data.address.country_code ? data.address.country_code.toUpperCase() : null,
			placeName: data.address.name ? data.address.name : null
		}
	} catch (error) {
		return {
			countryCode: null,
			placeName: null
		}
	}
}
