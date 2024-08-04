import { Box, Typography, useTheme } from "@mui/material";
import Company from "components/Company";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCompanies } from "../../state";

const CompanyListWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const companies = useSelector((state) => state.user.companies);

  const getCompanies = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${userId}/companies`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setCompanies({ companies: data }));
  };

  useEffect(() => {
    getCompanies();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Company List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {companies.map((company) => (
          <Company
            key={company._id}
            companyId={company._id}
            name={`${company.firstName} ${company.lastName}`}
            subtitle={company.occupation}
            userPicturePath={company.picturePath}
          />
        ))}
      </Box>
    </WidgetWrapper>
  );
};

export default CompanyListWidget;
