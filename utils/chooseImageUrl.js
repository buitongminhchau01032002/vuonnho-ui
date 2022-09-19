export default function chooseImageUrl(imageAttributes, size) {
    return imageAttributes?.formats?.[size]?.url ?? imageAttributes?.url;
}
