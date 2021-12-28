const actions = {}

actions.status = {}
actions.status.loading = "loading_state"
actions.status.request_init = "request_resource_init"
actions.status.request_failed = "request_resource_failed"
actions.status.request_successful = "request_resource_successful"
actions.status.request_error = "request_resource_error"
actions.status.request_cancel = "request_resource_cancel"

export default actions;