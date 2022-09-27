import * as test from "lib-pareto-test"
import { DDependencies } from "../dependencies/dependencies.p"
import { TTestData } from "../types/TestData.p"

export type FCreateGetTestset = (
    $: TTestData,
    $d: DDependencies,
) => test.FGetTestSet