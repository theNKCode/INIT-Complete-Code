// import { Box } from "@mui/material";

// const UserImage = ({ image, size = "60px" }) => {
//   return (
//     <Box width={size} height={size}>
//       <img
//         style={{ objectFit: "cover", borderRadius: "50%" }}
//         width={size}
//         height={size}
//         alt="user"
//         src={`http://localhost:4001/assets/${image}`}
//       />
//     </Box>
//   );
// };

// export default UserImage;




import { Box } from "@mui/material";

const UserImage = ({ imageUrl, size = "60px" }) => {
  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        src={imageUrl}
      />
    </Box>
  );
};

export default UserImage;
