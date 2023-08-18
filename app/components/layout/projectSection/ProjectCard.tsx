import * as React from "react";
import Image, { StaticImageData } from "next/image";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";

interface ProjectCardProps {
  img: StaticImageData;
  contributors: string[];
  // TODO: fix any
  progress: any;
}

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "6px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function ProjectCard(props: ProjectCardProps) {
  const { img, contributors } = props;
  return (
    <Card sx={{ height: 560, borderRadius: "24px" }}>
      <CardMedia sx={{ height: 350 }}>
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
          }}
        >
          <Image
            src={img}
            layout="fill"
            style={{ objectFit: "cover", padding: 16 }}
            alt="project"
          />
        </div>
      </CardMedia>

      <CardContent sx={{ p: 3 }}>
        <Typography
          variant="caption"
          component="div"
          sx={{ textAlign: "left" }}
        >
          {contributors.map((contributor, index) =>
            index + 1 < contributors.length ? (
              <>
                {contributor}
                {bull}
              </>
            ) : (
              contributor
            )
          )}
        </Typography>
        <Typography variant="h5" sx={{ textAlign: "left" }}>
          The most talked-about
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{ color: "secondary.contrastText", textAlign: "left" }}
        >
          As in previous years, the company unveiled a feature before it was
          ready. The obvious question soon followed.
        </Typography>
      </CardContent>
    </Card>
  );
}
