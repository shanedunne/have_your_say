import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";

const colours = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#6A33CF",
    "#A0D911",
    "#FA541C",
    "#FA8C16",
    "#13C2C2",
    "#2F54EB",
];

const PetitionsPieChart = ({ petitionCategories }) => {


    const total = Object.values(petitionCategories).reduce((acc, count) => acc + count, 0);

    const data = Object.entries(petitionCategories).map(([category, count]) => ({
        name: category,
        value: count
    }));


    return (
        <Card elevation={3}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Petitions by Category
                </Typography>
                <Box sx={{ width: "100%", height: 300, pb: 1 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                label
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={colours[index % colours.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend verticalAlign="bottom" height={36} />
                        </PieChart>
                    </ResponsiveContainer>
                </Box>
            </CardContent>
        </Card>
    );
};

export default PetitionsPieChart;
