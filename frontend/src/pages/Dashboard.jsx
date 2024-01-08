import DefaultLayout from "../components/DefaultLayout";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import Cards from "../components/Cards";
import Charts from "../components/Charts";

const Dashboard = () => {
  return (
    <div>
      <DefaultLayout>
        <Cards />
        <Charts />
      </DefaultLayout>
    </div>
  );
};

export default Dashboard;
