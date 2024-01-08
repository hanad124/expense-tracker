import React from "react";
import ReactApexChart from "react-apexcharts";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

import Stack from "@mui/material/Stack";
import ArrowCircleUpRounded from "@mui/icons-material/ArrowCircleUpRounded";

import { TotalRevenueOptions, TotalRevenueSeries } from "./chart.config";

const ApexChart = () => {
  return (
    <div className="flex flex-col md:flex-row mt-10 gap-4">
      <Card className=" rounded-[15px] p-4 flex flex-col shadow-none w-full">
        <Typography
          fontSize={18}
          fontWeight={600}
          // color="#11142d"
          className="dark:text-slate-200 text-slate-700"
        >
          Total Badget
        </Typography>

        <Stack my="10px" direction="row" gap={4} flexWrap="wrap">
          <Typography
            fontSize={28}
            fontWeight={700}
            // color="#11142d"
            className="dark:text-slate-200 text-slate-700"
          >
            $4,805
          </Typography>
        </Stack>

        <ReactApexChart
          series={TotalRevenueSeries}
          type="bar"
          height={310}
          options={TotalRevenueOptions}
        />
      </Card>
      <Card className="w-full shadow-none">
        <CardHeader>
          <CardTitle>Transections History</CardTitle>
          <CardDescription>Overview of latest month</CardDescription>
        </CardHeader>
        <CardContent>
          <Box
            sx={{
              height: 100,
              width: "100%",
              backgroundColor: "#fff",
              borderRadius: "15px",
            }}
          ></Box>
        </CardContent>
        <CardFooter>
          <CardDescription>Updated 2 days ago</CardDescription>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ApexChart;
