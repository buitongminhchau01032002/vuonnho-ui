export default function chooseImageUrl(image, size) {
    return image?.formats?.[size]?.url ?? image?.url;
}
