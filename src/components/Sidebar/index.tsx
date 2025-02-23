import React from "react";
import { Box, Button, VStack, useToken } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom"; // Import navigation hook

const Sidebar = () => {
  const navigate = useNavigate(); // Hook for navigation

  // Get theme colors using useToken
  const bgColor = useToken("colors", "background");
  const textColor = useToken("colors", "text");
  const primaryColor = useToken("colors", "primary");
  const secondaryColor = useToken("colors", "secondary");

  return (
    <Box
      w="250px"
      h="100vh"
      bg={bgColor}
      color={textColor}
      p={4}
      display="flex"
      flexDirection="column"
      fontFamily="body" // Apply the body font from the theme
    >
      <Box mb={6} fontSize="xl" fontWeight="bold" fontFamily="heading">
        {" "}
        Downloader
      </Box>

      <VStack gap={4} align="stretch">
        <Button
          bg={primaryColor}
          color="white"
          _hover={{ bg: secondaryColor }}
          onClick={() => navigate("/download-jobs")}
        >
          Download jobs
        </Button>
        <Button
          bg={primaryColor}
          color="white"
          _hover={{ bg: secondaryColor }}
          onClick={() => navigate("/create-job")}
        >
          Create job
        </Button>
        <Button
          bg={primaryColor}
          color="white"
          _hover={{ bg: secondaryColor }}
          onClick={() => navigate("/search-comics")}
        >
          Search comics
        </Button>
        <Button
          bg={primaryColor}
          color="white"
          _hover={{ bg: secondaryColor }}
          onClick={() => navigate("/view-comic")}
        >
          View comic
        </Button>
        <Button
          bg={primaryColor}
          color="white"
          _hover={{ bg: secondaryColor }}
          onClick={() => navigate("/add-comic")}
        >
          Add comic
        </Button>
      </VStack>
    </Box>
  );
};

export default Sidebar;
