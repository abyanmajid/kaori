import React from "react";
import { Button, ButtonGroup } from "@nextui-org/react";
import { Card, CardBody } from "@nextui-org/react";
import { Chip } from "@nextui-org/react";
import { Switch } from "@nextui-org/react";

export default function TasksPage() {
  return (
    <section className="flex flex-col gap-4 justify-start items-start overflow-auto py-4 md:py-6">
      <div className="grid grid-cols-2 gap-8 justify-between w-full">
        <div>
          <h1 className="text-3xl font-bold dark:text-white">
            📝 Tasks
            <small className="ms-2 font-semibold text-gray-400">
              PENDING&nbsp;
            </small>
          </h1>
          <hr className="h-px mt-2 mb-4 border-0 bg-gray-700"></hr>
          <div className="my-4">
            <ButtonGroup>
              <Button className="flex items-center justify-center bg-danger shadow">
                Pending{" "}
                <Chip size="sm" variant="flat">
                  0
                </Chip>
              </Button>
              <Button className="flex items-center justify-center">
                Overdue{" "}
                <Chip size="sm" variant="faded">
                  0
                </Chip>
              </Button>
              <Button className="flex items-center justify-center">
                Completed{" "}
                <Chip size="sm" variant="faded">
                  0
                </Chip>
              </Button>
            </ButtonGroup>
          </div>
          <div className="my-4">
            <Card>
              <CardBody>
                <p className="text-danger text-sm">Due: January 16, 2024</p>
                <p className="mt-2 mb-4 text-lg">
                  Make beautiful websites regardless of your design experience.
                </p>
                <div className="text-right">
                  <div className="flex gap-2 items-center">
                    <Button
                      isIconOnly
                      color="success"
                      variant="faded"
                      aria-label="Mark as complete"
                    >
                      <svg
                        className="w-6 h-6 font-bold"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 16 12"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M1 5.917 5.724 10.5 15 1.5"
                        />
                      </svg>
                    </Button>
                    <Button
                      isIconOnly
                      color="warning"
                      variant="faded"
                      aria-label="Edit task"
                    >
                      <svg
                        className="w-6 h-6 font-bold"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 21"
                      >
                        <path d="M20.168 6.136 14.325.293a1 1 0 0 0-1.414 0l-1.445 1.444a1 1 0 0 0 0 1.414l5.844 5.843a1 1 0 0 0 1.414 0l1.444-1.444a1 1 0 0 0 0-1.414Zm-4.205 2.927L11.4 4.5a1 1 0 0 0-1-.25L4.944 5.9a1 1 0 0 0-.652.624L.518 17.206a1 1 0 0 0 .236 1.04l.023.023 6.606-6.606a2.616 2.616 0 1 1 3.65 1.304 2.615 2.615 0 0 1-2.233.108l-6.61 6.609.024.023a1 1 0 0 0 1.04.236l10.682-3.773a1 1 0 0 0 .624-.653l1.653-5.457a.999.999 0 0 0-.25-.997Z" />
                        <path d="M10.233 11.1a.613.613 0 1 0-.867-.868.613.613 0 0 0 .867.868Z" />
                      </svg>
                    </Button>
                    <Button
                      isIconOnly
                      color="danger"
                      variant="faded"
                      aria-label="Delete task"
                    >
                      <svg
                        className="w-6 h-6 font-bold"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 19 21"
                      >
                        <path d="M17 4h-4V2a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v2H1a1 1 0 0 0 0 2h1v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1a1 1 0 1 0 0-2ZM7 2h4v2H7V2Zm1 14a1 1 0 1 1-2 0V8a1 1 0 0 1 2 0v8Zm4 0a1 1 0 0 1-2 0V8a1 1 0 0 1 2 0v8Z" />
                      </svg>
                    </Button>
                    <div className="separator"></div>
                    <Switch className="my-2" size="sm" color="danger">
                      Pinned
                    </Switch>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
        <div className="border-gray-700  bg-gray-950 bg-opacity-35 border rounded-lg p-4">
          <h1 className="text-3xl font-bold dark:text-white">
            📌 Pinned Tasks
          </h1>
          <hr className="h-px mt-2 mb-4 border-0 bg-gray-700"></hr>
          <div className="my-4">
            <Card>
              <CardBody>
                <p className="text-danger text-sm">Due: January 16, 2024</p>
                <p className="mt-2 mb-4 text-lg">
                  Make beautiful websites regardless of your design experience.
                </p>
                <div className="text-right">
                  <div className="flex gap-2 items-center">
                    <Button
                      isIconOnly
                      color="success"
                      variant="faded"
                      aria-label="Mark as complete"
                    >
                      <svg
                        className="w-6 h-6 font-bold"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 16 12"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M1 5.917 5.724 10.5 15 1.5"
                        />
                      </svg>
                    </Button>
                    <Button
                      isIconOnly
                      color="warning"
                      variant="faded"
                      aria-label="Edit task"
                    >
                      <svg
                        className="w-6 h-6 font-bold"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 21"
                      >
                        <path d="M20.168 6.136 14.325.293a1 1 0 0 0-1.414 0l-1.445 1.444a1 1 0 0 0 0 1.414l5.844 5.843a1 1 0 0 0 1.414 0l1.444-1.444a1 1 0 0 0 0-1.414Zm-4.205 2.927L11.4 4.5a1 1 0 0 0-1-.25L4.944 5.9a1 1 0 0 0-.652.624L.518 17.206a1 1 0 0 0 .236 1.04l.023.023 6.606-6.606a2.616 2.616 0 1 1 3.65 1.304 2.615 2.615 0 0 1-2.233.108l-6.61 6.609.024.023a1 1 0 0 0 1.04.236l10.682-3.773a1 1 0 0 0 .624-.653l1.653-5.457a.999.999 0 0 0-.25-.997Z" />
                        <path d="M10.233 11.1a.613.613 0 1 0-.867-.868.613.613 0 0 0 .867.868Z" />
                      </svg>
                    </Button>
                    <Button
                      isIconOnly
                      color="danger"
                      variant="faded"
                      aria-label="Delete task"
                    >
                      <svg
                        className="w-6 h-6 font-bold"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 19 21"
                      >
                        <path d="M17 4h-4V2a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v2H1a1 1 0 0 0 0 2h1v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1a1 1 0 1 0 0-2ZM7 2h4v2H7V2Zm1 14a1 1 0 1 1-2 0V8a1 1 0 0 1 2 0v8Zm4 0a1 1 0 0 1-2 0V8a1 1 0 0 1 2 0v8Z" />
                      </svg>
                    </Button>
                    <div className="separator"></div>
                    <Switch
                      defaultSelected
                      className="my-2"
                      size="sm"
                      color="danger"
                    >
                      Pinned
                    </Switch>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
