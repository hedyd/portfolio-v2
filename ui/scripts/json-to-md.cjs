const fs = require("fs");
const path = require("path");

const inputDir = "./src/data/projects";

const toMdList = (arr) => arr.map((item) => `- ${item}`).join("\n");

let mdContent = "";
fs.readdirSync(inputDir).forEach((file) => {
  const filePath = path.join(inputDir, file);
  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  const { title, job, year, summary, responsibilities, features, skills } =
    data;

  mdContent += `## ${title}
${job} | ${year}

${summary}

### Skills
${skills.join(", ")}

### Responsibilities
${toMdList(responsibilities)}

### Features
${toMdList(features)}

`;
});

const outputPath = path.join("./scripts", "output.md");
fs.writeFileSync(outputPath, mdContent);
