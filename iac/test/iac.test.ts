import * as cdk from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import { IacStack } from "../lib/iac-stack";

test("Stack creates Lambda function and API Gateway", () => {
  const app = new cdk.App();
  const stack = new IacStack(app, "TestStack");
  const template = Template.fromStack(stack);

  // Check for a Lambda Function
  template.hasResourceProperties("AWS::Lambda::Function", {
    Runtime: "nodejs22.x",
    Handler: "index.handler",
  });

  // Check for an API Gateway REST API
  template.hasResourceProperties("AWS::ApiGateway::RestApi", {
    Name: "ChatAPI",
  });

  template.hasResourceProperties("AWS::ApiGateway::UsagePlan", {
    Throttle: {
      RateLimit: 10,
      BurstLimit: 2,
    },
    Quota: {
      Limit: 100,
      Period: "DAY",
    },
  });

  // Check for a Method
  template.hasResourceProperties("AWS::ApiGateway::Method", {
    HttpMethod: "POST",
  });
});
