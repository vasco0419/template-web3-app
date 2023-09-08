import React, { useState } from "react"

import { getConfig } from "../utils/getConfig"
import { getProps } from "../utils/getProps"
import ConnectButton from "./sismo-connect-button"

export default function Claim() {
  const [pageState, setPageState] = useState<string>("init")
  const [error, setError] = useState<string>("")
  const selectedConfig = getConfig("claims")
  const connectProps = getProps("claims")

  console.log("selectedConfig", selectedConfig)
  console.log("connectProps", connectProps)
  return (
    <>
      <div>{"claims"}</div>

      {pageState == "init" ? (
        <ConnectButton
          selectedConfig={selectedConfig}
          connectProps={connectProps}
          setError={setError}
          setPageState={setPageState}
        />
      ) : (
        <>
          <button
            onClick={() => {
              window.location.href = "/integration/sismo/claim"
              // await router.push("/integration/sismo/auth")
            }}
          >
            {" "}
            RESET{" "}
          </button>
          <br></br>
          <div className="status-wrapper">
            {pageState == "verifying" ? (
              <span className="verifying"> Verifying ZK Proofs... </span>
            ) : (
              <>
                {error ? (
                  <span className="error">
                    {" "}
                    Error verifying ZK Proofs: {error}{" "}
                  </span>
                ) : (
                  <span className="verified"> ZK Proofs verified!</span>
                )}
              </>
            )}
          </div>
        </>
      )}
    </>
  )
}
