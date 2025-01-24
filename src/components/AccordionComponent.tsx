"use client";

//imports
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function AccordionComponent({
  expanded,
  handleChange,
  summary,
  detailsArray,
  panel,
}: {
  expanded: string | false;
  handleChange: (
    panel: string
  ) => (_: React.SyntheticEvent, isExpanded: boolean) => void;
  summary: string;
  detailsArray: string[];
  panel: string;
}) {
  return (
    <Accordion
      expanded={expanded === panel}
      onChange={handleChange(panel)}
      className="w-full"
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={panel}
        id={panel}
      >
        <h3>{summary}</h3>
      </AccordionSummary>
      <AccordionDetails>
        <ul>
          {detailsArray.map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ul>
      </AccordionDetails>
    </Accordion>
  );
}
