import React from "react";

import { Header, Icon } from "semantic-ui-react";
import { Entry } from "../types";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const GiveRating = ({ rating }: { rating: number }): JSX.Element => {
  switch (rating) {
    case 0:
      return <Icon name="heart" color="green" />;
    case 1:
      return <Icon name="heart" color="orange" />;
    case 3:
      return <Icon name="heart" color="yellow" />;
    default:
      return <Icon name="heart" color="red" />;
  }
};

export const EntryDetails = ({ entry }: { entry: Entry }): JSX.Element => {
  switch (entry.type) {
    case "HealthCheck":
      return (
        <>
          <Header as="h3">
            {entry.date}
            <Icon name="user doctor" />
          </Header>
          <p>{entry.description}</p>
          <GiveRating rating={entry.healthCheckRating} />
        </>
      );
    case "Hospital":
      return (
        <>
          <Header as="h3">
            {entry.date}
            <Icon name="bed" />
          </Header>
          <p>{entry.description}</p>
        </>
      );
    case "OccupationalHealthcare":
      return (
        <>
          <Header as="h3">
            {entry.date}
            <Icon name="asl" />
          </Header>
          <p>{entry.description}</p>
        </>
      );
    default:
      return assertNever(entry);
  }
};
