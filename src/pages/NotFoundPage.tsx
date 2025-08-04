import { Box, Typography, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <Container maxWidth="md">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        textAlign="center"
      >
        <Typography variant="h1" color="error" fontWeight="bold" gutterBottom>
          404
        </Typography>
        <Typography variant="h4" gutterBottom>
          Page Not Found
        </Typography>
        <Typography variant="body1" color="textSecondary" mb={4}>
          Sorry, the page you’re looking for doesn’t exist or has been moved.
        </Typography>

        <Button
          onClick={() => navigate("/")}
          variant="contained"
          color="primary"
          size="large"
        >
          Go to Homepage
        </Button>
      </Box>
    </Container>
  );
}
